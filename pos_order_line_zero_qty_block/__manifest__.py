# Copyright 2026 INVITU (https://www.invitu.com)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    "name": "POS Order Line Zero Quantity Block",
    "summary": "Block payment and kitchen sending on zero quantity lines",
    "version": "18.0.1.0.0",
    "category": "Point of Sale",
    "website": "https://github.com/OCA/pos",
    "author": "INVITU, Odoo Community Association (OCA)",
    "license": "AGPL-3",
    "installable": True,
    "depends": ["point_of_sale"],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_order_line_zero_qty_block/static/src/js/**/*",
        ],
        "web.assets_tests": [
            "pos_order_line_zero_qty_block/static/tests/tours/**/*",
        ],
    },
}
