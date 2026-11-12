/* Copyright 2026 INVITU (https://www.invitu.com)
 * License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl). */

import {AlertDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
import {PosStore} from "@point_of_sale/app/store/pos_store";
import {_t} from "@web/core/l10n/translation";
import {floatIsZero} from "@web/core/utils/numbers";
import {patch} from "@web/core/utils/patch";

patch(PosStore.prototype, {
    getZeroQuantityLines(order) {
        // Combo children follow their parent quantity: checking the parent is enough.
        return order.lines.filter((line) => {
            if (line.combo_parent_id) {
                return false;
            }
            const rounding = line.product_id.uom_id.rounding;
            const decimals = Math.max(0, Math.ceil(-Math.log10(rounding)));
            return floatIsZero(line.qty, decimals);
        });
    },
    checkZeroQuantityLines(order) {
        // Apply numpad keys still waiting in the buffer before reading quantities.
        this.env.services.number_buffer.capture();
        const lines = this.getZeroQuantityLines(order);
        if (!lines.length) {
            return true;
        }
        this.selectOrderLine(order, lines[0]);
        this.dialog.add(AlertDialog, {
            title: _t("Zero quantity lines"),
            body:
                _t("Set a quantity or remove these lines:") +
                "\n" +
                lines.map((line) => `- ${line.get_full_product_name()}`).join("\n"),
        });
        return false;
    },
    async pay() {
        const order = this.get_order();
        if (order && !this.checkZeroQuantityLines(order)) {
            return;
        }
        return await super.pay(...arguments);
    },
    async sendOrderInPreparationUpdateLastChange(order, cancelled = false) {
        if (!cancelled && !this.checkZeroQuantityLines(order)) {
            return;
        }
        return await super.sendOrderInPreparationUpdateLastChange(...arguments);
    },
});
