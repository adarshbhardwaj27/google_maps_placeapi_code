let autocomplete;
let address1Field;
let address2Field;
let postalField;

function initAutocomplete() {
    address1Field = document.querySelector("#ship-address");
    address2Field = document.querySelector("#address2");
    postalField = document.querySelector("#postcode");
    autocomplete = new google.maps.places.Autocomplete(address1Field, {
        componentRestrictions: { country: ["nz"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    address1Field.focus();
    autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
    const place = autocomplete.getPlace();
    let address1 = "";
    let postcode = "";
    var record_data = {};
    for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
            case "street_number": {
                record_data['Billing_Street'] = `${component.long_name},`
                // address1 = `${component.long_name} ${address1}`;
                break;
            }

            case "route": {
                record_data['Billing_Street'] += component.long_name
                // address1 += component.long_name;
                break;
            }


            // case "postal_code_suffix": {
            //     postcode = `${postcode}-${component.long_name}`;
            //     break;
            // }
            case "sublocality":
                record_data['Billing_City'] = `${component.long_name}`
                // document.querySelector("#locality").value = component.long_name;
                break;
            case "locality":
                record_data['Billing_State'] = `${component.long_name}`
                // document.querySelector("#locality").value = component.long_name;
                break;
            // case "administrative_area_level_1": {
            //     document.querySelector("#state").value = component.long_name;
            //     break;
            // }
            case "country":
                record_data['Billing_Country'] = `${component.long_name}`
                // document.querySelector("#country").value = component.long_name;
                break;


            case "postal_code": {
                record_data['Billing_Code'] = `${component.long_name}`
                // postcode = `${component.long_name} ${postcode}`;
                break;
            }
        }
    }

    address1Field.value = address1;
    postalField.value = postcode;
    console.log(record_data);
    address2Field.focus();
}

window.initAutocomplete = initAutocomplete;