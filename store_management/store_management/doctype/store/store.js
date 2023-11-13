// Copyright (c) 2023, dennis low and contributors
// For license information, please see license.txt

frappe.ui.form.on("Store", {
    address:function(frm){
        console.log("here");
        let address=frm.doc.address
        console.log(address);       
        frappe.call({
            type:'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyApWfGwc65jSlocEqPVLcLqtqi2OpXR3ts&address=${address}`,
            callback: function(r) {
                console.log(r);
                let longitude=r.results[0].geometry.location.lng;
                let latitude=r.results[0].geometry.location.lat;
                let country = r.results[0].address_components.find(component => component.types.includes('country')).long_name;
                let postal_code = r.results[0].address_components.find(component => component.types.includes('postal_code')).long_name;
                let state =r.results[0].address_components.find(component => component.types.includes('administrative_area_level_1')).long_name;
                let city =r.results[0].address_components.find(component => component.types.includes('locality')).long_name;
                console.log(longitude);      
                console.log(latitude);      
                console.log(country);      
                console.log(postal_code);      
                console.log(state);      
                console.log(city);  
                frm.set_value('city',city);
                frm.set_value('state',state);
                frm.set_value('postal_code',postal_code);
                frm.set_value('country',country);
                frm.set_value('longitude',longitude);
                frm.set_value('latitude',latitude);
            }
        })







        // //get location data
        // let map =JSON.parse(frm.doc.location).features[0];
        // //get coordinate
        // if(map&&map.geometry.type=='Point'){
        //     let longitude=map.geometry.coordinates[0];
        //     let latitude=map.geometry.coordinates[1];
        //     frm.set_value('longitude',longitude);
        //     frm.set_value('latitude',latitude);

        //     //get address
        //     frappe.call({
        //         type:'GET',
        //         url: `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        //         callback: function(r) {
        //             frm.set_value('address',r.display_name);
        //             frm.set_value('city',r.address.city);
        //         }
        //     })
        // }
  
    },

});