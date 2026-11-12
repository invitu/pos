# Copyright 2026 INVITU (https://www.invitu.com)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo.tests import tagged

from odoo.addons.point_of_sale.tests.test_frontend import TestPointOfSaleHttpCommon


@tagged("post_install", "-at_install")
class TestPosOrderLineZeroQtyBlock(TestPointOfSaleHttpCommon):
    def test_zero_qty_line_blocks_payment(self):
        self.main_pos_config.with_user(self.pos_user).open_ui()
        self.start_pos_tour("PosOrderLineZeroQtyBlock")
