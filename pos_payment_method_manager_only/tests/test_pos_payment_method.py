# Copyright 2026 INVITU (<https://www.invitu.com>)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo.exceptions import UserError
from odoo.tests import tagged

from odoo.addons.point_of_sale.tests.common import TestPoSCommon


@tagged("post_install", "-at_install")
class TestPosPaymentMethodManagerOnly(TestPoSCommon):
    def setUp(self):
        super().setUp()
        self.config = self.basic_config
        self.open_new_session()

    def test_loaded_in_pos(self):
        fields = self.env["pos.payment.method"]._load_pos_data_fields(self.config.id)
        self.assertIn("manager_only", fields)

    def test_writable_in_open_session(self):
        self.bank_pm1.manager_only = True
        self.assertTrue(self.bank_pm1.manager_only)
        with self.assertRaises(UserError):
            self.bank_pm1.name = "Card"
