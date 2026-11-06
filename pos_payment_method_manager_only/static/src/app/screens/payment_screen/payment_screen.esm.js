// Copyright 2026 INVITU (<https://www.invitu.com>)
// License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

import {AlertDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
import {PaymentScreen} from "@point_of_sale/app/screens/payment_screen/payment_screen";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";

patch(PaymentScreen.prototype, {
    async _isOrderValid() {
        // The payment line may have been added by a manager before handing
        // the register back to a cashier.
        if (
            this.pos.get_cashier()._role !== "manager" &&
            this.paymentLines.some((line) => line.payment_method_id.manager_only)
        ) {
            this.dialog.add(AlertDialog, {
                title: _t("Manager Only Payment Method"),
                body: _t(
                    "This order uses a payment method reserved to managers. " +
                        "A manager must validate it."
                ),
            });
            return false;
        }
        return super._isOrderValid(...arguments);
    },
});
