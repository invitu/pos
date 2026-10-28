/* Copyright 2026 INVITU (<https://www.invitu.com>)
 * License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl). */

import {ProductConfiguratorPopup} from "@point_of_sale/app/store/product_configurator_popup/product_configurator_popup";
import {patch} from "@web/core/utils/patch";

patch(ProductConfiguratorPopup.prototype, {
    isArchivedCombination() {
        return super.isArchivedCombination() || this.hasUnavailableValue();
    },
    hasUnavailableValue() {
        const ptavModel = this.pos.models["product.template.attribute.value"];
        return this.getVariantAttributeValueIds().some(
            (id) => ptavModel.get(id)?.is_available === false
        );
    },
});
