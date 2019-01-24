'use strict'

import Q from 'q'

// AJAX function to work on old android devices
function tinyxhr(url, method, post, contenttype, jwtoken) {
    let deferred = Q.defer()
    let requestTimeout, xhr
    try {
        xhr = new XMLHttpRequest()
    } catch(e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            if (console) console.log("tinyxhr: XMLHttpRequest not supported")
            deferred.reject({
                error: 'XMLHttpRequest not supported'
            })
            return deferred.promise
        }
    }

    requestTimeout = setTimeout(function() {
        xhr.abort()
        deferred.reject({
            error: "aborted by a timeout",
            xhr
        })
    }, 5000)

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return
        clearTimeout(requestTimeout)
        if (xhr.status != 200) {
            deferred.reject({
                error: `server respnse status is ${xhr.status}`,
                data: xhr.responseText,
                xhr
            })
        } else {
            deferred.resolve({
                error: null,
                data: xhr.responseText,
                xhr
            })
        }
    }
    xhr.open(method ? method.toUpperCase() : "GET", url, true)

    if (jwtoken) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + jwtoken)
    }

    if(!post)
        xhr.send()
    else {
        xhr.setRequestHeader('Content-type', contenttype ? contenttype : 'application/x-www-form-urlencoded')
        xhr.send(post)
    }

    return deferred.promise
}

export default {
    get: (url, jwtoken) => {
        return tinyxhr(url, 'GET', {}, 'application/json', jwtoken)
    },
    
    delete: (url, jwtoken) => {
        return tinyxhr(url, 'DELETE', {}, null, jwtoken)
    },

    post: (url, data, jwtoken) => {
        return tinyxhr(url, 'POST', JSON.stringify(data), 'application/json', jwtoken)
    }
}
