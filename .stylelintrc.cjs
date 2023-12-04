const { propertyGroups } = require('stylelint-config-clean-order')

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never', // Don't add empty lines between order groups.
  properties
}))

module.exports = {
    "extends": ["stylelint-config-standard-scss", "stylelint-config-clean-order"],
    "rules": {
        "property-no-vendor-prefix": null,
        "font-family-no-missing-generic-family-keyword": null,
        'order/properties-order': [propertiesOrder]
    },
    "plugins": [
		"stylelint-order"
	]
}