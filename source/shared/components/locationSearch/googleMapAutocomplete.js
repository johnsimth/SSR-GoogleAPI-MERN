import _ from 'lodash';
import Q from 'q';

const googleMapAutocomplete = value => {
  const autocomplete = new google.maps.places.AutocompleteService()
  const service = new google.maps.places.PlacesService(document.getElementById('map'))
  return Q.Promise((resolve, reject) => {
    const country = 'nz';
    const city = 'Auckland ';
    autocomplete.getPlacePredictions({ input: city + value, componentRestrictions: { country }},
      (predictions, status) => {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          reject(status)
        } else {
          let promises = predictions.map((prediction) => {
            let deferred = Q.defer()
            if (_.indexOf(prediction.types, 'establishment') > -1) {
              let request = {
                placeId: prediction.place_id
              }
              setTimeout(
                service.getDetails(request, (place, status)=> {
                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                    deferred.resolve(place.name + ', ' + place.formatted_address)
                  } else {
                    deferred.resolve(prediction.description)
                  }
                }), 500)
            } else {
              deferred.resolve(prediction.description)
            }
            return deferred.promise
          })
          Q.all(promises)
            .then(resolve)
        }
      })
    }
  )
}

export default googleMapAutocomplete;