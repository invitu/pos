# Copyright 2026 INVITU (<https://www.invitu.com>)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    "name": "POS Product Attribute Value Availability",
    "version": "18.0.1.0.0",
    "category": "Sales/Point of Sale",
    "website": "https://github.com/OCA/pos",
    "author": "INVITU, Odoo Community Association (OCA)",
    "license": "AGPL-3",
    "development_status": "Alpha",
    "depends": ["product_attribute_value_availability", "point_of_sale"],
    "auto_install": True,
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_product_attribute_value_availability/static/src/**/*",
        ],
        "web.assets_tests": [
            "pos_product_attribute_value_availability/static/tests/tours/**/*",
        ],
    },
}
