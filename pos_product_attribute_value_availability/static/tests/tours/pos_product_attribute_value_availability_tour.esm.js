/* Copyright 2026 INVITU (<https://www.invitu.com>)
 * License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl). */

import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductConfigurator from "@point_of_sale/../tests/tours/utils/product_configurator_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import {registry} from "@web/core/registry";

registry.category("web_tour.tours").add("PosProductAttributeValueAvailabilityTour", {
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.clickDisplayedProduct("Steak"),
            {
                content: "Unavailable value is greyed out",
                trigger: ".modal .ptav-not-available:contains('Gratin')",
            },
            ProductConfigurator.pickMulti("Gratin"),
            {
                content: "Combination with an unavailable value cannot be added",
                trigger: ".modal footer button.btn-primary.disabled",
            },
            ProductConfigurator.pickMulti("Gratin"),
            ProductConfigurator.pickMulti("Fries"),
            {
                content: "Combination without unavailable value can be added",
                trigger: ".modal footer button.btn-primary:not(.disabled)",
            },
        ].flat(),
});
