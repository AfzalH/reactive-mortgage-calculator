<?php

function srizon_mortgage_global_defaults() {
	return [
		'currency' => '$',

		'property_value_is_changeable' => true,
		'property_value_fixed'         => 500000,
		'property_value'               => 30000,
		'property_value_min'           => 10000,
		'property_value_max'           => 3000000,
		'property_value_text'          => 'Home Value',

		'downpayment_is_percent'    => true,
		'downpayment_is_changeable' => true,
		'downpayment_amount_fixed'  => 10000,
		'downpayment_amount'        => 3000,
		'downpayment_amount_min'    => 1000,
		'downpayment_amount_max'    => 1000000,
		'downpayment_percent_fixed' => 10,
		'downpayment_percent'       => 20,
		'downpayment_percent_min'   => 3,
		'downpayment_percent_max'   => 80,
		'downpayment_text'          => 'Down Payment',

		'interest_is_changeable' => true,
		'interest_fixed'         => 5.5,
		'interest'               => 4.5,
		'interest_min'           => 1,
		'interest_max'           => 20,
		'interest_text'          => 'Interest Rate (%)',

		'tenure_is_changeable' => true,
		'tenure_fixed'         => 15,
		'tenure'               => 20,
		'tenure_min'           => 1,
		'tenure_max'           => 50,
		'tenure_text'          => 'Amortization Period',

		'start_month'      => 1,
		'start_month_min'  => 0,
		'start_month_max'  => 12,
		'start_month_text' => 'Start After',
	];
}