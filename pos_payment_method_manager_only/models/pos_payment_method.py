# Copyright 2026 INVITU (<https://www.invitu.com>)
# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

from odoo import api, fields, models


class PosPaymentMethod(models.Model):
    _inherit = "pos.payment.method"

    manager_only = fields.Boolean(
        help="Only POS managers can use this payment method.",
    )

    @api.model
    def _load_pos_data_fields(self, config_id):
        return super()._load_pos_data_fields(config_id) + ["manager_only"]

    def _is_write_forbidden(self, field_names):
        # Must stay editable during an open session, e.g. when the payment
        # terminal link is down for a long time.
        return super()._is_write_forbidden(field_names - {"manager_only"})
