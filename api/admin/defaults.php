<?php

function srizon_mortgage_global_defaults() {
	return [
		'currency' => '$',

		'property_value_is_changeable' => true,
		'property_value_fixed'         => 500000,
		'property_value_min'           => 10000,
		'property_value_max'           => 3000000,
		'property_value_text'          => 'Home Value',

		'down_amount_percent'       => true,
		'down_amount_is_changeable' => true,
		'down_amount_fixed_fixed'   => 10000,
		'down_amount_fixed_min'     => 1000,
		'down_amount_fixed_max'     => 1000000,
		'down_amount_percent_fixed' => 10,
		'down_amount_percent_min'   => 2,
		'down_amount_percent_max'   => 80,
		'down_amount_text'          => 'Down Payment',

		'interest_is_changeable' => true,
		'interest_fixed'         => 5.5,
		'interest_min'           => 1,
		'interest_max'           => 20,
		'interest_text'          => 'Interest Rate (%)',

		'tenure_is_changeable' => true,
		'tenure_fixed'         => 15,
		'tenure_min'           => 1,
		'tenure_max'           => 50,
		'tenure_text'          => 'Amortization Period',
	];
}