# Copyright 2026 INVITU (<https://www.invitu.com>)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
{
    "name": "Point of Sale - Manager Only Payment Methods",
    "summary": "Restrict some payment methods to POS managers",
    "version": "18.0.1.0.0",
    "category": "Point of Sale",
    "website": "https://github.com/OCA/pos",
    "author": "INVITU, Odoo Community Association (OCA)",
    "license": "AGPL-3",
    "depends": ["point_of_sale"],
    "data": ["views/pos_payment_method_views.xml"],
    "assets": {
        "point_of_sale._assets_pos": [
            "pos_payment_method_manager_only/static/src/**/*",
        ],
    },
    "installable": True,
}
