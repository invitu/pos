/* Copyright 2026 INVITU (https://www.invitu.com)
 * License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl). */

import * as Chrome from "@point_of_sale/../tests/tours/utils/chrome_util";
import * as Dialog from "@point_of_sale/../tests/tours/utils/dialog_util";
import * as ProductScreen from "@point_of_sale/../tests/tours/utils/product_screen_util";
import {registry} from "@web/core/registry";

registry.category("web_tour.tours").add("PosOrderLineZeroQtyBlock", {
    steps: () =>
        [
            Chrome.startPoS(),
            Dialog.confirm("Open Register"),
            ProductScreen.clickDisplayedProduct("Desk Organizer"),
            ProductScreen.clickNumpad("⌫"),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "0.0"),
            ProductScreen.clickPayButton(false),
            Dialog.is({title: "Zero quantity lines"}),
            Dialog.confirm(),
            ProductScreen.isShown(),
            ProductScreen.selectedOrderlineHas("Desk Organizer", "0.0"),
            ProductScreen.clickNumpad("2"),
            ProductScreen.clickPayButton(),
            Chrome.endTour(),
        ].flat(),
});
