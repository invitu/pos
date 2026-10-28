# Copyright 2026 INVITU (<https://www.invitu.com>)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import Command
from odoo.tests import tagged

from odoo.addons.point_of_sale.tests.test_frontend import TestPointOfSaleHttpCommon


@tagged("post_install", "-at_install")
class TestPosProductAttributeValueAvailability(TestPointOfSaleHttpCommon):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.attribute = cls.env["product.attribute"].create(
            {
                "name": "Side",
                "display_type": "multi",
                "create_variant": "no_variant",
                "value_ids": [
                    Command.create({"name": "Gratin"}),
                    Command.create({"name": "Fries"}),
                ],
            }
        )
        cls.gratin = cls.attribute.value_ids.filtered(lambda v: v.name == "Gratin")
        cls.env["product.template"].create(
            {
                "name": "Steak",
                "available_in_pos": True,
                "attribute_line_ids": [
                    Command.create(
                        {
                            "attribute_id": cls.attribute.id,
                            "value_ids": [Command.set(cls.attribute.value_ids.ids)],
                        }
                    )
                ],
            }
        )

    def test_configurator_tour(self):
        self.gratin.is_available = False
        self.main_pos_config.with_user(self.pos_user).open_ui()
        self.start_pos_tour("PosProductAttributeValueAvailabilityTour")
