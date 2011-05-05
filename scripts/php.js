/* 
 * More info at: http://kevin.vanzonneveld.net/techblog/category/php2js
 * 
 * php.js is copyright 2008 Kevin van Zonneveld.
 * 
 * Portions copyright _argos, Ates Goral (http://magnetiq.com), Legaev
 * Andrey, Jonas Raoni Soares Silva (http://www.jsfromhell.com),
 * Webtoolkit.info (http://www.webtoolkit.info/), Carlos R. L. Rodrigues, Ash
 * Searle (http://hexmen.com/blog/), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Karol Kowalski, Tyler Akins
 * (http://rumkin.com), marrtins, mdsjack (http://www.mdsjack.bo.it),
 * Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev),
 * Bayron Guevara, Cord, David, David James, Leslie Hoare, Lincoln Ramsay,
 * MeEtc (http://yass.meetcweb.com), Mick@el, Nick Callen, Peter-Paul Koch
 * (http://www.quirksmode.org/js/beat.html), Philippe Baumann, Steve Clay,
 * booeyOH, kenneth
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */ 

function abs( mixed_number )  {
    // Absolute value
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_abs/
    // +       version: 801.3015
    // +   original by: _argos
    // +   improved by: Karol Kowalski
    // *     example 1: abs(4.2);
    // *     returns 1: 4.2
    // *     example 2: abs(-4.2);
    // *     returns 2: 4.2
    // *     example 3: abs(-5);
    // *     returns 3: 5
    // *     example 4: abs('_argos');
    // *     returns 4: 0

    return ( ( isNaN ( mixed_number ) ) ? 0 : Math.abs ( mixed_number ) );
}

function addslashes( str ) {
    // Quote string with slashes
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_addslashes/
    // +       version: 802.1208
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   improved by: marrtins
    // *     example 1: addslashes("kevin's birthday");
    // *     returns 1: "kevin\'s birthday"

    return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
}

const CASE_LOWER = 0;
const CASE_UPPER = 1;
function array_change_key_case(array) {
    // Changes all keys in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_change_key_case/
    // +       version: 801.2208
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: array_change_key_case(42);
    // *     returns 1: false
    // *     example 2: array_change_key_case([ 3, 5 ]);
    // *     returns 2: {0: 3, 1: 5}
    // *     example 3: array_change_key_case({ FuBaR: 42 });
    // *     returns 3: {"fubar": 42}
    // *     example 4: array_change_key_case({ FuBaR: 42 }, CASE_LOWER);
    // *     returns 4: {"fubar": 42}
    // *     example 5: array_change_key_case({ FuBaR: 42 }, CASE_UPPER);
    // *     returns 5: {"FUBAR": 42}
    // *     example 6: array_change_key_case({ FuBaR: 42 }, 2);
    // *     returns 6: {"FUBAR": 42}

    var case_fn, tmp_ar = new Object, argc = arguments.length, argv = arguments, key;

    if (array instanceof Array) {
        return array;
    }

    if (array instanceof Object) {
        if( argc == 1 || argv[1] == 'CASE_LOWER' || argv[1] == 0 || ( CASE_LOWER && arguments[1] == CASE_LOWER ) ){
            case_fn = "toLowerCase";
        } else{
            case_fn = "toUpperCase";
        }
        for (var key in array) {
            tmp_ar[key[case_fn]()] = array[key];
        }
        return tmp_ar;
    }

    return false;
}

function array_chunk( input, size ) {
    // Split an array into chunks
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_chunk/
    // +       version: 801.1009
    // +   original by: Carlos R. L. Rodrigues
    // *     example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2);
    // *     returns 1: {0 : {0: 'Kevin', 1: 'van'} , 1 : {0: 'Zonneveld'}}

    for(var x, i = 0, c = -1, l = input.length, n = []; i < l; i++){
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
    }

    return n;
}

function array_combine( keys, values ) {
    // Creates an array by using one array for keys and another for its values
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_combine/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_combine([0,1,2], ['kevin','van','zonneveld']);
    // *     returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

    var new_array = {}, keycount=keys.length, i;

    // input sanitation
    if( !keys || !values || keys.constructor !== Array || values.constructor !== Array ){
        return false;
    }

    // number of elements does not match
    if(keycount != values.length){
        return false;
    }

    for ( i=0; i < keycount; i++ ){
        new_array[keys[i]] = values[i];
    }

    return new_array;
}

function array_count_values( array ) {
    // Counts all the values of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_count_values/
    // +       version: 801.2208
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ]);
    // *     returns 1: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" });
    // *     returns 2: {3:2, 5:1, "foo":2, "bar":1}
    // *     example 3: array_count_values([ true, 4.2, 42, "fubar" ]);
    // *     returns 3: {42:1, "fubar":1}

    var tmp_ar = new Object(), key;

    function countValue(value) {
        switch (typeof(value)) {
        case "number":
            if (Math.floor(value) != value) {
                return;
            }
        case "string":
            if (value in this) {
                ++this[value];
            } else {
                this[value] = 1;
            }
        }
    }

    if (array instanceof Array) {
        array.forEach(countValue, tmp_ar);
    } else if (array instanceof Object) {
        for (var key in array) {
            countValue.call(tmp_ar, array[key]);
        }
    }

    return tmp_ar;

}

function array_diff (array) {
    // Computes the difference of arrays
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld']);
    // *     returns 1: ['Kevin']

    var arr_dif = [], i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false;

    // loop through 1st array
    for ( key in array ){
        // loop over other arrays
        for (i = 1; i< argc; i++){
            // find in the compare array
            found = false;
            for (key_c in argv[i]) {
                if (argv[i][key_c] == array[key]) {
                    found = true;
                    break;
                }
            }

            if(!found){
                arr_dif[key] = array[key];
            }
        }
    }

    return arr_dif;
}

function array_diff_assoc ( array ) {
    // Computes the difference of arrays with additional index check
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_assoc/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'});
    // *     returns 1: {1: 'van', 2: 'Zonneveld'}

    var arr_dif = {}, i = 1, argc = arguments.length, argv = arguments, key, key_c, found=false;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Array && typeof array != 'object' && typeof array != 'array') ){
        return null;
    }

    // loop through 1st array
    for ( key in array ){
        // loop over other arrays
        for (i = 1; i< argc; i++){
            // find in the compare array
            found = false;
            if(argv[i][key]){
                found = true;
                break;
            }

            if(!found){
                arr_dif[key] = array[key];
            }
        }
    }

    return arr_dif;
}

function array_diff_key( object ) {
    // Computes the difference of arrays using keys for comparison
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_diff_key/
    // +       version: 801.2221
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4});
    // *     returns 1: {"red":1, "green":2, "blue":3, "white":4}
    // *     example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5});
    // *     returns 2: {"green":2, "blue":3, "white":4}
    // *     example 3: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {green: 6, blue: 7});
    // *     returns 3: {"white":4}
    // *     example 4: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5});
    // *     returns 4: {"green":2, "blue":3, "white":4}

    var tpm_ar = new Object(), argc = arguments.length, argv = arguments, key, argidx, other;

    for (key in object) {
        tpm_ar[key] = object[key];
    }
    for (argidx = 1; argidx < argc; ++argidx) {
        other = argv[argidx];

        if (other instanceof Object) {
            for (key in other) {
                delete tpm_ar[key];
            }
        }
    }

    return tpm_ar;
}

function array_fill( start_index, num, mixed_val ) {
    // Fill an array with values
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_fill/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: array_fill(5, 6, 'banana');
    // *     returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

    var key, tmp_arr = new Array();

    if ( !isNaN ( start_index ) && !isNaN ( num ) ) {
        for( key = start_index; key <= num; key++ ) {
            tmp_arr[key] = mixed_val;
        }
    }

    return tmp_arr;
}

function array_flip( trans ) {
    // Exchanges all keys with their associated values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_flip/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_flip( {a: 1, b: 1, c: 2} );
    // *     returns 1: {1: 'b', 2: 'c'}

    var key, tmp_ar = {};

    for( key in trans ) {
        tmp_ar[trans[key]] = key;
    }

    return tmp_ar;
}

function array_key_exists ( key, search ) {
    // Checks if the given key or index exists in the array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_key_exists/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true

    // input sanitation
    if( !search || (search.constructor !== Array && search.constructor !== Object) ){
        return false;
    }

    return search[key] !== undefined;
}

function array_keys( input, search_value, strict ) {
    // Return all the keys of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_keys/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'firstname', 1: 'surname'}

    var tmp_arr = new Array(), strict = !!strict, include = true, cnt = 0;

    for ( key in input ){
        include = true;
        if ( search_value != undefined ) {
            if( strict && input[key] !== search_value ){
                include = false;
            } else if( input[key] != search_value ){
                include = false;
            }
        }

        if( include ) {
            tmp_arr[cnt] = key;
            cnt++;
        }
    }

    return tmp_arr;
}

function array_map( callback ) {
    // Applies the callback to the elements of the given arrays
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_map/
    // +       version: 801.3120
    // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_map( function(a){return (a * a * a);}, [1, 2, 3, 4, 5] );
    // *     returns 1: [ 1, 8, 27, 64, 125 ]


    var argc = arguments.length, argv = arguments;
    var j = argv[1].length, i = 0, k = 1, m = 0;
    var tmp = [], tmp_ar = [];

    while (i < j) {
        while (k < argc){
            tmp[m++] = argv[k++][i];
        }

        m = 0;
        k = 1;

        if( callback ){
            tmp_ar[i++] = callback.apply(null, tmp);
        } else{
            tmp_ar[i++] = tmp;
        }

        tmp = [];
    }

    return tmp_ar;
}

function array_pad ( input, pad_size, pad_value ) {
    // Pad array to the specified length with a value
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_pad/
    // +       version: 801.2920
    // +   original by: _argos
    // *     example 1: array_pad([ 7, 8, 9 ], 2, 'a');
    // *     returns 1: [ 7, 8, 9]
    // *     example 2: array_pad([ 7, 8, 9 ], 5, 'a');
    // *     returns 2: [ 7, 8, 9, 'a', 'a']
    // *     example 3: array_pad([ 7, 8, 9 ], 5, 2);
    // *     returns 3: [ 7, 8, 9, 2, 2]
    // *     example 4: array_pad([ 7, 8, 9 ], -5, 'a');
    // *     returns 4: [ 'a', 'a', 7, 8, 9 ]

    var pad = [], newArray = [], newLength, i=0;

    if ( input instanceof Array && !isNaN ( pad_size ) ) {
        newLength = ( ( pad_size < 0 ) ? ( pad_size * -1 ) : pad_size );
        if ( newLength > input.length ) {
            for ( i = 0; i < ( newLength - input.length ); i++ ) { newArray [ i ] = pad_value; }
            pad = ( ( pad_size < 0 ) ? newArray.concat ( input ) : input.concat ( newArray ) );
        } else {
            pad = input;
        }
    }

    return pad;
}

function array_pop( array ) {
    // Pop the element off the end of array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_pop/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_pop([0,1,2]);
    // *     returns 1: 2

    // done popping, are we?
    if( !array.length ){
        return null;
    }

    return array.pop();
}

function array_product ( input ) {
    // Calculate the product of values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_product/
    // +       version: 802.323
    // +   original by: _argos
    // *     example 1: array_product([ 2, 4, 6, 8 ]);
    // *     returns 1: 384

    var Index = 0, Product = 1;
    if ( input instanceof Array ) {
        while ( Index < input.length ) {
            Product *= ( !isNaN ( input [ Index ] ) ? input [ Index ] : 0 );
            Index++;
        }
    } else {
        Product = null;
    }

    return Product;
}

function array_push ( array ) {
    // Push one or more elements onto the end of array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_push/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_push(['kevin','van'], 'zonneveld');
    // *     returns 1: 3

    var i, argv = arguments, argc = argv.length;

    for (i=1; i < argc; i++){
        array[array.length++] = argv[i];
    }

    return array.length;
}

function array_rand ( input, num_req ) {
    // Pick one or more random entries out of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_rand/
    // +       version: 802.323
    // +   original by: _argos
    // *     example 1: array_rand( ['Kevin'], 1 );
    // *     returns 1: 0

    var Indexes = [];
    var Ticks = num_req || 1;
    var Check = {
        Duplicate    : function ( input, value ) {
            var Exist = false, Index = 0;
            while ( Index < input.length ) {
                if ( input [ Index ] === value ) {
                    Exist = true;
                    break;
                }
                Index++;
            }
            return Exist;
        }
    };

    if ( input instanceof Array && Ticks <= input.length ) {
        while ( true ) {
            var Rand = Math.floor ( ( Math.random ( ) * input.length ) );
            if ( Indexes.length === Ticks ) { break; }
            if ( !Check.Duplicate ( Indexes, Rand ) ) { Indexes.push ( Rand ); }
        }
    } else {
        Indexes = null;
    }

    return ( ( Ticks == 1 ) ? Indexes.join ( ) : Indexes );
}


function array_reverse( array, preserve_keys ) {
    // Return an array with elements in reverse order
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_reverse/
    // +       version: 802.1613
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Karol Kowalski
    // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true );
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}

    var arr_len=array.length, newkey=0, tmp_ar = {}

    for(var key in array){
        newkey=arr_len-key-1;
        tmp_ar[(!!preserve_keys)?newkey:key]=array[newkey];
    }

    return tmp_ar;
}


function array_search( needle, haystack, strict ) {
    // Searches the array for a given value and returns the corresponding key if
    // successful
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_search/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
    // *     returns 1: 'surname'

    var strict = !!strict;

    for(var key in haystack){
        if( (strict && haystack[key] === needle) || (!strict && haystack[key] == needle) ){
            return key;
        }
    }

    return false;
}

function array_shift( array ) {
    // Shift an element off the beginning of array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_shift/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_shift(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin'

    var i=0, first_elm=null, cnt=0, tmp_arr = {};

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
        return null;
    }

    if( array.constructor === Array ){
        first_elm = array[0];
        for( i = 0; i < array.length; i++ ){
            array[i] = array[i+1];
        }
        array.length--;
    } else if( array.constructor === Object ){
        for(var key in array){
            if( cnt == 0 ){
                first_elm = array[key];
            } else{
                tmp_arr[key] = array[key];
            }
            cnt ++;
        }
        array = tmp_arr;
    }

    return first_elm;
}

function array_sum( array ) {
    // Calculate the sum of values in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_sum/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_sum([4, 9, 182.6]);
    // *     returns 1: 195.6

    var key, sum=0;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
        return null;
    }

    for(var key in array){
        sum += array[key];
    }

    return sum;
}

function array_unique( array ) {
    // Removes duplicate values from an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unique/
    // +       version: 801.1011
    // +   original by: Carlos R. L. Rodrigues
    // *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld']);
    // *     returns 1: true

    var p, i, j;
    for(i = array.length; i;){
        for(p = --i; p > 0;){
            if(array[i] === array[--p]){
                for(j = p; --p && array[i] === array[p];);
                i -= array.splice(p + 1, j - p).length;
            }
        }
    }

    return true;
}

function array_unshift( array ) {
    // Prepend one or more elements to the beginning of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_unshift/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_unshift(['van', 'Zonneveld'], 'Kevin');
    // *     returns 1: 3

    var cnt=0, tot_cnt=0, tmp_arr = {}, argc = arguments.length, argv = arguments;

    // input sanitation
    if( !array || (array.constructor !== Array && array.constructor !== Array && typeof array != 'object' && typeof array != 'array') ){
        return null;
    }

    // prepend
    for (i = 1; i< argc; i++){
        tmp_arr[cnt] = argv[i];
        cnt++; tot_cnt++;
    }

    // append original
    for(var key in array){
        if( typeof key == 'number' && isFinite( key ) ){
            // modify numeric key
            tmp_arr[cnt] = array[key];
            cnt++; tot_cnt++;
        } else{
            // save original alphanumeric key
            tmp_arr[key] = array[key];
            tot_cnt++;
        }
    }

    return tot_cnt;
}

function array_values( input ) {
    // Return all the values of an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_array_values/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} );
    // *     returns 1: {0: 'Kevin', 1: 'van Zonneveld'}

    var tmp_arr = new Array(), cnt = 0;

    for ( key in input ){
        tmp_arr[cnt] = input[key];
        cnt++;
    }

    return tmp_arr;
}

function base64_decode( data ) {
    // Decodes data encoded with MIME base64
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base64_decode/
    // +       version: 801.921
    // +   original by: Tyler Akins (http://rumkin.com)
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'


    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do {  // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1<<18 | h2<<12 | h3<<6 | h4;

        o1 = bits>>16 & 0xff;
        o2 = bits>>8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64)      enc += String.fromCharCode(o1);
        else if (h4 == 64) enc += String.fromCharCode(o1, o2);
        else               enc += String.fromCharCode(o1, o2, o3);
    } while (i < data.length);

    return enc;
}

function base64_encode( data ) {
    // Encodes data with MIME base64
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_base64_encode/
    // +       version: 801.921
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='

    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1<<16 | o2<<8 | o3;

        h1 = bits>>18 & 0x3f;
        h2 = bits>>12 & 0x3f;
        h3 = bits>>6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    switch( data.length % 3 ){
        case 1:
            enc = enc.slice(0, -2) + '==';
        break;
        case 2:
            enc = enc.slice(0, -1) + '=';
        break;
    }

    return enc;
}

function basename(path, suffix) {
    // Returns filename component of path
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_basename/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'

    var b = path.replace(/^.*[\/\\]/g, '');
    if (typeof(suffix) == 'string' && b.substr(-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    return b;
}

function checkdate( month, day, year ) {
    // Validate a Gregorian date
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_checkdate/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: checkdate(12, 31, 2000);
    // *     returns 1: true
    // *     example 2: checkdate(2, 29, 2001);
    // *     returns 2: false

    var myDate = new Date();

    myDate.setFullYear( year, month, day );

    return ( myDate.getMonth() != month );
}

function chr( ascii ) {
    // Return a specific character
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_chr/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: chr(75);
    // *     returns 1: 'K'

    return String.fromCharCode(ascii);
}

function compact ( var_names ) {
    // Create array containing variables and their values
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_compact/
    // +       version: 802.323
    // +   original by: _argos
    // *     example 1: compact('var1', 'var2');
    // *     returns 1: {}

    var Index = 0, Matrix = {};
    var Process = function ( value ) {
        for ( var i = 0; i < value.length; i++ ) {
            var key_value = value [ i ];
            if ( key_value instanceof Array ) {
                Process ( key_value );
            } else {
                if ( typeof window [ key_value ] !== 'undefined' ) {
                    Matrix [ key_value ] = window [ key_value ];
                }
            }
        }
        return true;
    };

    Process ( arguments );
    return Matrix;
}

function count( mixed_var, mode ) {
    // Count elements in an array, or properties in an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: _argos
    // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
    // *     returns 1: 6
    // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
    // *     returns 2: 6

    var key, cnt = 0;

    if( mode == 'COUNT_RECURSIVE' ) mode = 1;
    if( mode != 1 ) mode = 0;

    for (key in mixed_var){
        cnt++;
        if( mode==1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object) ){
            cnt += count(mixed_var[key], 1);
        }
    }

    return cnt;
}

function count_chars( str, mode ) {
    // Return information about characters used in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_count_chars/
    // +       version: 801.2221
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: count_chars("Hello World!");
    // *     returns 1: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0, 27:0, 28:0, 29:0, 30:0, 31:0, 32:1, 33:1, 34:0, 35:0, 36:0, 37:0, 38:0, 39:0, 40:0, 41:0, 42:0, 43:0, 44:0, 45:0, 46:0, 47:0, 48:0, 49:0, 50:0, 51:0, 52:0, 53:0, 54:0, 55:0, 56:0, 57:0, 58:0, 59:0, 60:0, 61:0, 62:0, 63:0, 64:0, 65:0, 66:0, 67:0, 68:0, 69:0, 70:0, 71:0, 72:1, 73:0, 74:0, 75:0, 76:0, 77:0, 78:0, 79:0, 80:0, 81:0, 82:0, 83:0, 84:0, 85:0, 86:0, 87:1, 88:0, 89:0, 90:0, 91:0, 92:0, 93:0, 94:0, 95:0, 96:0, 97:0, 98:0, 99:0, 100:1, 101:1, 102:0, 103:0, 104:0, 105:0, 106:0, 107:0, 108:3, 109:0, 110:0, 111:2, 112:0, 113:0, 114:1, 115:0, 116:0, 117:0, 118:0, 119:0, 120:0, 121:0, 122:0, 123:0, 124:0, 125:0, 126:0, 127:0, 128:0, 129:0, 130:0, 131:0, 132:0, 133:0, 134:0, 135:0, 136:0, 137:0, 138:0, 139:0, 140:0, 141:0, 142:0, 143:0, 144:0, 145:0, 146:0, 147:0, 148:0, 149:0, 150:0, 151:0, 152:0, 153:0, 154:0, 155:0, 156:0, 157:0, 158:0, 159:0, 160:0, 161:0, 162:0, 163:0, 164:0, 165:0, 166:0, 167:0, 168:0, 169:0, 170:0, 171:0, 172:0, 173:0, 174:0, 175:0, 176:0, 177:0, 178:0, 179:0, 180:0, 181:0, 182:0, 183:0, 184:0, 185:0, 186:0, 187:0, 188:0, 189:0, 190:0, 191:0, 192:0, 193:0, 194:0, 195:0, 196:0, 197:0, 198:0, 199:0, 200:0, 201:0, 202:0, 203:0, 204:0, 205:0, 206:0, 207:0, 208:0, 209:0, 210:0, 211:0, 212:0, 213:0, 214:0, 215:0, 216:0, 217:0, 218:0, 219:0, 220:0, 221:0, 222:0, 223:0, 224:0, 225:0, 226:0, 227:0, 228:0, 229:0, 230:0, 231:0, 232:0, 233:0, 234:0, 235:0, 236:0, 237:0, 238:0, 239:0, 240:0, 241:0, 242:0, 243:0, 244:0, 245:0, 246:0, 247:0, 248:0, 249:0, 250:0, 251:0, 252:0, 253:0, 254:0, 255:0}
    // *     example 2: count_chars("Hello World!", 0);
    // *     returns 2: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0, 27:0, 28:0, 29:0, 30:0, 31:0, 32:1, 33:1, 34:0, 35:0, 36:0, 37:0, 38:0, 39:0, 40:0, 41:0, 42:0, 43:0, 44:0, 45:0, 46:0, 47:0, 48:0, 49:0, 50:0, 51:0, 52:0, 53:0, 54:0, 55:0, 56:0, 57:0, 58:0, 59:0, 60:0, 61:0, 62:0, 63:0, 64:0, 65:0, 66:0, 67:0, 68:0, 69:0, 70:0, 71:0, 72:1, 73:0, 74:0, 75:0, 76:0, 77:0, 78:0, 79:0, 80:0, 81:0, 82:0, 83:0, 84:0, 85:0, 86:0, 87:1, 88:0, 89:0, 90:0, 91:0, 92:0, 93:0, 94:0, 95:0, 96:0, 97:0, 98:0, 99:0, 100:1, 101:1, 102:0, 103:0, 104:0, 105:0, 106:0, 107:0, 108:3, 109:0, 110:0, 111:2, 112:0, 113:0, 114:1, 115:0, 116:0, 117:0, 118:0, 119:0, 120:0, 121:0, 122:0, 123:0, 124:0, 125:0, 126:0, 127:0, 128:0, 129:0, 130:0, 131:0, 132:0, 133:0, 134:0, 135:0, 136:0, 137:0, 138:0, 139:0, 140:0, 141:0, 142:0, 143:0, 144:0, 145:0, 146:0, 147:0, 148:0, 149:0, 150:0, 151:0, 152:0, 153:0, 154:0, 155:0, 156:0, 157:0, 158:0, 159:0, 160:0, 161:0, 162:0, 163:0, 164:0, 165:0, 166:0, 167:0, 168:0, 169:0, 170:0, 171:0, 172:0, 173:0, 174:0, 175:0, 176:0, 177:0, 178:0, 179:0, 180:0, 181:0, 182:0, 183:0, 184:0, 185:0, 186:0, 187:0, 188:0, 189:0, 190:0, 191:0, 192:0, 193:0, 194:0, 195:0, 196:0, 197:0, 198:0, 199:0, 200:0, 201:0, 202:0, 203:0, 204:0, 205:0, 206:0, 207:0, 208:0, 209:0, 210:0, 211:0, 212:0, 213:0, 214:0, 215:0, 216:0, 217:0, 218:0, 219:0, 220:0, 221:0, 222:0, 223:0, 224:0, 225:0, 226:0, 227:0, 228:0, 229:0, 230:0, 231:0, 232:0, 233:0, 234:0, 235:0, 236:0, 237:0, 238:0, 239:0, 240:0, 241:0, 242:0, 243:0, 244:0, 245:0, 246:0, 247:0, 248:0, 249:0, 250:0, 251:0, 252:0, 253:0, 254:0, 255:0}
    // *     example 3: count_chars("Hello World!", 1);
    // *     returns 3: {72:1, 101:1, 108:3, 111:2, 32:1, 87:1, 114:1, 100:1, 33:1}
    // *     example 4: count_chars("Hello World!", 2);
    // *     returns 4: {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0, 24:0, 25:0, 26:0, 27:0, 28:0, 29:0, 30:0, 31:0, 34:0, 35:0, 36:0, 37:0, 38:0, 39:0, 40:0, 41:0, 42:0, 43:0, 44:0, 45:0, 46:0, 47:0, 48:0, 49:0, 50:0, 51:0, 52:0, 53:0, 54:0, 55:0, 56:0, 57:0, 58:0, 59:0, 60:0, 61:0, 62:0, 63:0, 64:0, 65:0, 66:0, 67:0, 68:0, 69:0, 70:0, 71:0, 73:0, 74:0, 75:0, 76:0, 77:0, 78:0, 79:0, 80:0, 81:0, 82:0, 83:0, 84:0, 85:0, 86:0, 88:0, 89:0, 90:0, 91:0, 92:0, 93:0, 94:0, 95:0, 96:0, 97:0, 98:0, 99:0, 102:0, 103:0, 104:0, 105:0, 106:0, 107:0, 109:0, 110:0, 112:0, 113:0, 115:0, 116:0, 117:0, 118:0, 119:0, 120:0, 121:0, 122:0, 123:0, 124:0, 125:0, 126:0, 127:0, 128:0, 129:0, 130:0, 131:0, 132:0, 133:0, 134:0, 135:0, 136:0, 137:0, 138:0, 139:0, 140:0, 141:0, 142:0, 143:0, 144:0, 145:0, 146:0, 147:0, 148:0, 149:0, 150:0, 151:0, 152:0, 153:0, 154:0, 155:0, 156:0, 157:0, 158:0, 159:0, 160:0, 161:0, 162:0, 163:0, 164:0, 165:0, 166:0, 167:0, 168:0, 169:0, 170:0, 171:0, 172:0, 173:0, 174:0, 175:0, 176:0, 177:0, 178:0, 179:0, 180:0, 181:0, 182:0, 183:0, 184:0, 185:0, 186:0, 187:0, 188:0, 189:0, 190:0, 191:0, 192:0, 193:0, 194:0, 195:0, 196:0, 197:0, 198:0, 199:0, 200:0, 201:0, 202:0, 203:0, 204:0, 205:0, 206:0, 207:0, 208:0, 209:0, 210:0, 211:0, 212:0, 213:0, 214:0, 215:0, 216:0, 217:0, 218:0, 219:0, 220:0, 221:0, 222:0, 223:0, 224:0, 225:0, 226:0, 227:0, 228:0, 229:0, 230:0, 231:0, 232:0, 233:0, 234:0, 235:0, 236:0, 237:0, 238:0, 239:0, 240:0, 241:0, 242:0, 243:0, 244:0, 245:0, 246:0, 247:0, 248:0, 249:0, 250:0, 251:0, 252:0, 253:0, 254:0, 255:0}
    // *     example 5: count_chars("Hello World!", 3);
    // *     returns 5: "Helo Wrd!"

    var histogram = new Object(), tmp_ar = new Array(), argc = arguments.length, key, i, code, mode;

    if (argc == 1) {
        mode = 0;
    }

    mode_even = (mode & 1) == 0;
    if (mode_even) {
        for (i = 1; i < 256; ++i) {
            histogram[i] = 0;
        }
    }

    for (i = 0; i < str.length; ++i) {
        code = str.charCodeAt(i);
        if (code in histogram) {
            ++histogram[code];
        } else {
            histogram[code] = 1;
        }
    }

    if (mode > 0) {
        for (key in histogram) {
            if (histogram[key] == 0 != mode_even) {
                delete histogram[key];
            }
        }
    }

    if (mode < 3) {
        return histogram;
    } else {
        for (key in histogram) {
            tmp_ar.push(String.fromCharCode(key));
        }
        return tmp_ar.join("");
    }
}

function crc32 ( str ) {
    // Calculates the crc32 polynomial of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_crc32/
    // +       version: 801.921
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // -    depends on: utf8_encode
    // *     example 1: crc32('Kevin van Zonneveld');
    // *     returns 1: 1249991249

    str = utf8_encode(str);
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

    if (typeof(crc) == "undefined") { crc = 0; }
    var x = 0;
    var y = 0;

    crc = crc ^ (-1);
    for( var i = 0, iTop = str.length; i < iTop; i++ ) {
        y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
        x = "0x" + table.substr( y * 9, 8 );
        crc = ( crc >>> 8 ) ^ x;
    }

    return crc ^ (-1);
}

function date ( format, timestamp ) {
    // Format a local time/date
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_date/
    // +       version: 802.1221
    // +   original by: Carlos R. L. Rodrigues
    // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: MeEtc (http://yass.meetcweb.com)
    // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
    // *     returns 1: '09:09:40 m is month'
    // *     example 2: date('F j, Y, g:i a', 1062462400);
    // *     returns 2: 'September 2, 2003, 2:26 am'

    var a, jsdate = new Date(timestamp ? timestamp * 1000 : null);
    var pad = function(n, c){
        if( (n = n + "").length < c ) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday","Monday","Tuesday","Wednesday",
        "Thursday","Friday","Saturday"];
    var txt_ordin = {1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"};
    var txt_months =  ["", "January", "February", "March", "April",
        "May", "June", "July", "August", "September", "October", "November",
        "December"];

    var f = {
        // Day
            d: function(){
                return pad(f.j(), 2);
            },
            D: function(){
                t = f.l(); return t.substr(0,3);
            },
            j: function(){
                return jsdate.getDate();
            },
            l: function(){
                return txt_weekdays[f.w()];
            },
            N: function(){
                return f.w() + 1;
            },
            S: function(){
                return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
            },
            w: function(){
                return jsdate.getDay();
            },
            z: function(){
                return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
            },

        // Week
            W: function(){
                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;

                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } else{

                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime()/1000));
                    } else{
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },

        // Month
            F: function(){
                return txt_months[f.n()];
            },
            m: function(){
                return pad(f.n(), 2);
            },
            M: function(){
                t = f.n(); return t.substr(0,3);
            },
            n: function(){
                return jsdate.getMonth() + 1;
            },
            t: function(){
                var n;
                if( (n = jsdate.getMonth() + 1) == 2 ){
                    return 28 + f.L();
                } else{
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                        return 31;
                    } else{
                        return 30;
                    }
                }
            },

        // Year
            L: function(){
                var y = f.Y();
                return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0;
            },
            //o not supported yet
            Y: function(){
                return jsdate.getFullYear();
            },
            y: function(){
                return (jsdate.getFullYear() + "").slice(2);
            },

        // Time
            a: function(){
                return jsdate.getHours() > 11 ? "pm" : "am";
            },
            A: function(){
                return f.a().toUpperCase();
            },
            B: function(){
                // peter paul koch:
                var off = (jsdate.getTimezoneOffset() + 60)*60;
                var theSeconds = (jsdate.getHours() * 3600) +
                                 (jsdate.getMinutes() * 60) +
                                  jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds/86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00"+beat;
                if ((String(beat)).length == 2) beat = "0"+beat;
                return beat;
            },
            g: function(){
                return jsdate.getHours() % 12 || 12;
            },
            G: function(){
                return jsdate.getHours();
            },
            h: function(){
                return pad(f.g(), 2);
            },
            H: function(){
                return pad(jsdate.getHours(), 2);
            },
            i: function(){
                return pad(jsdate.getMinutes(), 2);
            },
            s: function(){
                return pad(jsdate.getSeconds(), 2);
            },
            //u not supported yet

        // Timezone
            //e not supported yet
            //I not supported yet
            O: function(){
               var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
               if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
               return t;
            },
            P: function(){
                var O = f.O();
                return (O.substr(0, 3) + ":" + O.substr(3, 2));
            },
            //T not supported yet
            //Z not supported yet

        // Full Date/Time
            c: function(){
                return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
            },
            //r not supported yet
            U: function(){
                return Math.round(jsdate.getTime()/1000);
            }
    };

    return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
        if( t!=s ){
            // escaped
            ret = s;
        } else if( f[s] ){
            // a date function exists
            ret = f[s]();
        } else{
            // nothing special
            ret = s;
        }

        return ret;
    });
}

define = (function(){
    // Defines a named constant
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_define/
    // +       version: 801.2208
    // +   original by: Andrea Giammarchi (http://webreflection.blogspot.com)
    // *     example 1: define('AUTHOR_NAME', 'Andrea Giammarchi');
    // *     returns 1: true

    function toString(name, value){
        return  "const " + name + "=" + (
            /^(null|true|false|(\+|\-)?\d+(\.\d+)?)$/.test(value = String(value)) ? value : '"' + replace(value) + '"'
        )
    };
    var define, replace;
    try{
        eval("const e=1");
        replace = function(value){
            var replace = {"\x08":"b","\x0A":"\\n","\x0B":"v","\x0C":"f","\x0D":"\\r",'"':'"',"\\":"\\"};
            return  value.replace(/\x08|[\x0A-\x0D]|"|\\/g, function(value){return  "\\"+replace[value]})
        };
        define = function(name, value){
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.appendChild(document.createTextNode(toString(name, value)));
            document.documentElement.appendChild(script);
            document.documentElement.removeChild(script);
        }
    }
    catch(e){
        replace = function(value){
            var replace = {"\x0A":"\\n", "\x0D":"\\r"};
            return  value.replace(/"/g, '""').replace(/\n|\r/g, function(value){return replace[value]})
        };
        define = this.execScript ?
        function(name, value){
            execScript(toString(name, value), "VBScript");
        }:
        function(name, value){
            eval(toString(name, value).substring(6));
        }
    };
    return  define;
})();

function defined( constant_name )  {
    // Checks whether a given named constant exists
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_defined/
    // +       version: 802.107
    // +   original by: _argos
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: defined('IMAGINARY_CONSTANT1');
    // *     returns 1: false

    return (typeof window[constant_name] !== 'undefined');
}

function empty( mixed_var ) {
    // Determine whether a variable is empty
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_empty/
    // +       version: 801.1007
    // +   original by: Philippe Baumann
    // *     example 1: empty(null);
    // *     returns 1: true

    return ( mixed_var === "" || mixed_var === 0   || mixed_var === "0" || mixed_var === null  || mixed_var === false  ||  ( is_array(mixed_var) && mixed_var.length === 0 ) );
}

function end ( array ) {
    // Set the internal pointer of an array to its last element
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_end/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // *     example 1: end({firstname: 'Kevin', middle: 'van', surname: 'Zonneveld'});
    // *     returns 1: 'Zonneveld'

    var last_elm, key;

    if (array.constructor === Array){
        last_elm = array[(array.length-1)];
    } else {
        for (key in array){
            last_elm = array[key];
        }
    }

    return last_elm;
}

function explode( delimiter, string ) {
    // Split a string by string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_explode/
    // +       version: 802.107
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: kenneth
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

    var emptyArray = { 0: '' };

    if ( arguments.length != 2
        || typeof arguments[0] == 'undefined'
        || typeof arguments[1] == 'undefined' )
    {
        return null;
    }

    if ( delimiter === ''
        || delimiter === false
        || delimiter === null )
    {
        return false;
    }

    if ( typeof delimiter == 'function'
        || typeof delimiter == 'object'
        || typeof string == 'function'
        || typeof string == 'object' )
    {
        return emptyArray;
    }

    if ( delimiter === true ) {
        delimiter = '1';
    }

    return string.toString().split ( delimiter.toString() );
}

function file( url ) {
    // Reads entire file into an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file/
    // +       version: 801.1920
    // +   original by: Legaev Andrey
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // *     example 1: file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: {0: '123'}

    var req = null;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
        try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
            try { req = new XMLHttpRequest(); } catch(e) {}
        }
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');

    req.open("GET", url, false);
    req.send(null);

    return req.responseText.split('\n');
}

function file_get_contents( url ) {
    // Reads entire file into a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_file_get_contents/
    // +       version: 801.1921
    // +   original by: Legaev Andrey
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // *     example 1: file_get_contents('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var req = null;
    try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
        try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
            try { req = new XMLHttpRequest(); } catch(e) {}
        }
    }
    if (req == null) throw new Error('XMLHttpRequest not supported');

    req.open("GET", url, false);
    req.send(null);

    return req.responseText;
}

function function_exists( function_name ) {
    // Return TRUE if the given function has been defined
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_function_exists/
    // +       version: 802.107
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Steve Clay
    // +   improved by: Legaev Andrey
    // *     example 1: function_exists('isFinite');
    // *     returns 1: true


    if (typeof function_name == 'string'){
        return (typeof window[function_name] == 'function');
    } else{
        return (function_name instanceof Function);
    }
}

function get_class(obj) {
    // Returns the name of the class of an object
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_get_class/
    // +       version: 802.1613
    // +   original by: Ates Goral (http://magnetiq.com)
    // +   improved by: David James
    // *     example 1: get_class(new (function MyClass() {}));
    // *     returns 1: "MyClass"
    // *     example 2: get_class({});
    // *     returns 2: "Object"
    // *     example 3: get_class([]);
    // *     returns 3: false
    // *     example 4: get_class(42);
    // *     returns 4: false
    // *     example 5: get_class(window);
    // *     returns 5: false
    // *     example 6: get_class(function MyFunction() {});
    // *     returns 6: false

    if (obj instanceof Object && !(obj instanceof Array) &&
        !(obj instanceof Function) && obj.constructor) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);

        if (arr && arr.length == 2) {
            return arr[1];
        }
    }

    return false;
}

function htmlentities(s){
    // Convert all applicable characters to HTML entities
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_htmlentities/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'

    var div = document.createElement('div');
    var text = document.createTextNode(s);
    div.appendChild(text);
    return div.innerHTML;
}

function implode( glue, pieces ) {
    // Join array elements with a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_implode/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: _argos
    // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'Kevin van Zonneveld'

    return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );
}

function in_array(needle, haystack, strict) {
    // Checks if a value exists in an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_in_array/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    var found = false, key, strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}

function include( filename ) {
    // The include() statement includes and evaluates the specified file.
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_include/
    // +       version: 801.3120
    // +   original by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: include('/js/imaginary1.js');
    // *     returns 1: 1

    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', filename);
    js.setAttribute('defer', 'defer');
    document.getElementsByTagName('HEAD')[0].appendChild(js);

    // save include state for reference by include_once
    if (!window.php_js) window.php_js = {};
    if (!window.php_js.includes) window.php_js.includes = {};
    if (!window.php_js.includes[filename]) {
        window.php_js.includes[filename] = 1;
    } else {
        window.php_js.includes[filename]++;
    }

    return window.php_js.includes[filename];

}

function include_once( filename ) {
    // The include_once() statement includes and evaluates the specified file during
    // the execution of the script. This is a behavior similar to the include()
    // statement, with the only difference being that if the code from a file has
    // already been included, it will not be included again.  As the name suggests, it
    // will be included just once.
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_include_once/
    // +       version: 801.3120
    // +   original by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: include
    // *     example 1: include_once('/js/imaginary2.js');
    // *     returns 1: 1

    if (!window.php_js) window.php_js = {};
    if (!window.php_js.includes) window.php_js.includes = {};
    if (!window.php_js.includes[filename]) {
        return include(filename);
    } else{
        return window.php_js.includes[filename];
    }
}

function is_array( mixed_var ) {
    // Finds whether a variable is an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_array/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Legaev Andrey
    // +   bugfixed by: Cord
    // *     example 1: is_array(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true
    // *     example 2: is_array('Kevin van Zonneveld');
    // *     returns 2: false

    return ( mixed_var instanceof Array );
}

function is_numeric( mixed_var ) {
    // Finds whether a variable is a number or a numeric string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_is_numeric/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: David
    // *     example 1: is_numeric(186.31);
    // *     returns 1: true
    // *     example 2: is_numeric('Kevin van Zonneveld');
    // *     returns 2: false
    // *     example 3: is_numeric('+186.31e2');
    // *     returns 3: true

    return !isNaN( mixed_var );
}

function isset( mixed_var ) {
    // Determine whether a variable is set
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_isset/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: isset( undefined, true);
    // *     returns 1: false
    // *     example 2: isset( 'Kevin van Zonneveld' );
    // *     returns 2: true

    var i = 0, argc = arguments.length, argv = arguments, set=true;

    for (i = 0; i< argc; i++){
        if( argv[i] == undefined ){
            set = false;
            break;
        }
    }

    return set;
}

function levenshtein( str1, str2 ) {
    // Calculate Levenshtein distance between two strings
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_levenshtein/
    // +       version: 801.1017
    // +   original by: Carlos R. L. Rodrigues
    // *     example 1: levenshtein('Kevin van Zonneveld', 'Kevin van Sommeveld');
    // *     returns 1: 3

    var s, l = (s = str1.split("")).length, t = (str2 = str2.split("")).length, i, j, m, n;
    if(!(l || t)) return Math.max(l, t);
    for(var a = [], i = l + 1; i; a[--i] = [i]);
    for(i = t + 1; a[0][--i] = i;);
    for(i = -1, m = s.length; ++i < m;){
        for(j = -1, n = str2.length; ++j < n;){
            a[(i *= 1) + 1][(j *= 1) + 1] = Math.min(a[i][j + 1] + 1, a[i + 1][j] + 1, a[i][j] + (s[i] != str2[j]));
        }
    }
    return a[l][t];
}

function ltrim ( str ) {
    // Strip whitespace (or other characters) from the beginning of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ltrim/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ltrim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld    '

    return str.replace(/^\s+/,"");
}

function md5 ( str ) {
    // Calculate the md5 hash of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_md5/
    // +       version: 801.1017
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // -    depends on: utf8_encode
    // *     example 1: md5('Kevin van Zonneveld');
    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'


    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x,y,z) { return (x & y) | ((~x) & z); }
    function G(x,y,z) { return (x & z) | (y & (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(str) {
        var lWordCount;
        var lMessageLength = str.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    }

    function WordToHex(lValue) {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    }

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    str = utf8_encode(str);
    x = ConvertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}

function md5_file ( str_filename ) {
    // Calculates the md5 hash of a given file
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_md5_file/
    // +       version: 802.416
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: file_get_contents
    // -    depends on: md5
    // -    depends on:  utf8_encode
    // *     example 1: md5_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '202cb962ac59075b964b07152d234b70'

    return md5(file_get_contents(str_filename));
}

function mktime() {
    // Get Unix timestamp for a date
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_mktime/
    // +       version: 802.815
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: mktime( 14, 10, 2, 2, 1, 2008 );
    // *     returns 1: 1204377002

    var i = 0, d = new Date(), argv = arguments, argc = argv.length;
    var dateManip = {
        0: function(tt){ return d.setHours(tt); },
        1: function(tt){ return d.setMinutes(tt); },
        2: function(tt){ return d.setSeconds(tt); },
        3: function(tt){ return d.setMonth(tt); },
        4: function(tt){ return d.setDate(tt); },
        5: function(tt){ return d.setYear(tt); }
    };

    for( i = 0; i < argc; i++ ){
        if(argv[i] && isNaN(argv[i])){
            return false;
        } else if(argv[i]){
            // arg is number, let's manipulate date object
            if(!dateManip[i](argv[i])){
                // failed
                return false;
            }
        }
    }

    return Math.floor(d.getTime()/1000);
}

function nl2br( str ) {
    // Inserts HTML line breaks before all newlines in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_nl2br/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: nl2br('Kevin\nvan\nZonneveld');
    // *     returns 1: 'Kevin<br/>van<br/>Zonneveld'

    return str.replace(/([^>])\n/g, '$1<br/>');
}

function number_format( number, decimals, dec_point, thousands_sep ) {
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: number_format(1234.5678, 2, '.', '');
    // *     returns 1: 1234.57

    var i, j, kw, kd, km;

    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ",";
    }
    if( thousands_sep == undefined ){
        thousands_sep = ".";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");


    return km + kw + kd;
}

function ord( string ) {
    // Return ASCII value of character
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ord/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ord('K');
    // *     returns 1: 75

    return string.charCodeAt(0);
}

function preg_quote( str ) {
    // Quote regular expression characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_preg_quote/
    // +       version: 801.2320
    // +   original by: booeyOH
    // +   improved by: Ates Goral (http://magnetiq.com)
    // *     example 1: preg_quote("$40");
    // *     returns 1: "\\\$40"
    // *     example 2: preg_quote("*RRRING* Hello?");
    // *     returns 2: "\\*RRRING\\* Hello\\?"
    // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
    // *     returns 3: "\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:"

    return str.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}

function printf( ) {
    // Output a formatted string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_printf/
    // +       version: 801.1316
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // -    depends on: sprintf
    // *     example 1: printf("%01.2f", 123.1);
    // *     returns 1: 6

    var ret ='', i = 0, a = arguments, args = Array(arguments.length);
    while (i < args.length) args[i] = 'a[' + (i++) + ']';
    ret = eval('sprintf(' + args + ')');
    document.write(ret);
    return ret.length;
}

function rand( min, max ) {
    // Generate a random integer
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rand/
    // +       version: 801.1313
    // +   original by: Leslie Hoare
    // *     example 1: rand(1, 1);
    // *     returns 1: 1

    if( max ) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (min + 1));
    }
}

function range ( low, high, step ) {
    // Create an array containing a range of elements
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_range/
    // +       version: 801.3118
    // +   original by: _argos
    // *     example 1: range ( 0, 12 );
    // *     returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    // *     example 2: range( 0, 100, 10 );
    // *     returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    // *     example 3: range( 'a', 'i' );
    // *     returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    // *     example 4: range( 'c', 'a' );
    // *     returns 4: ['c', 'b', 'a']

    var matrix = [];
    var inival, endval, plus;
    var walker = step || 1;
    var chars  = false;

    if ( !isNaN ( low ) && !isNaN ( high ) ) {
        inival = low;
        endval = high;
    } else if ( isNaN ( low ) && isNaN ( high ) ) {
        chars = true;
        inival = low.charCodeAt ( 0 );
        endval = high.charCodeAt ( 0 );
    } else {
        inival = ( isNaN ( low ) ? 0 : low );
        endval = ( isNaN ( high ) ? 0 : high );
    }

    plus = ( ( inival > endval ) ? false : true );
    if ( plus ) {
        while ( inival <= endval ) {
            matrix.push ( ( ( chars ) ? String.fromCharCode ( inival ) : inival ) );
            inival += walker;
        }
    } else {
        while ( inival >= endval ) {
            matrix.push ( ( ( chars ) ? String.fromCharCode ( inival ) : inival ) );
            inival -= walker;
        }
    }

    return matrix;
}

function reset ( array ) {
    // Set the internal pointer of an array to its first element
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_reset/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Legaev Andrey
    // *     example 1: reset({firstname: 'Kevin', middle: 'van', surname: 'Zonneveld'});
    // *     returns 1: 'Kevin'

    var first_elm, key;

    if (array.constructor === Array){
        first_elm = array[0];
    } else {
        for (key in array){
            first_elm = array[key];
            break;
        }
    }

    return first_elm;
}

function rtrim ( str ) {
    // Strip whitespace (or other characters) from the end of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_rtrim/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: rtrim('    Kevin van Zonneveld    ');
    // *     returns 1: '    Kevin van Zonneveld'

    return str.replace(/\s+$/,"");
}

function serialize( mixed_val ) {
    // Generates a storable representation of a value
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_serialize/
    // +       version: 801.2611
    // +   original by: Ates Goral (http://magnetiq.com)
    // -    depends on: get_class
    // *     example 1: serialize(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    // *     example 2: serialize(3.14);
    // *     returns 2: 'd:3.14;'
    // *     example 3: serialize("foo");
    // *     returns 3: 's:3:"foo";'
    // *     example 4: serialize(true);
    // *     returns 4: 'b:1;'
    // *     example 5: serialize(new Object());
    // *     returns 5: 'O:6:"Object":0:{}'
    // *     example 6: serialize(new (function MyClass() {}));
    // *     returns 6: 'O:7:"MyClass":0:{}'
    // *     example 7: serialize(new (function MyClass() { this.prop = 42 }));
    // *     returns 7: 'O:7:"MyClass":1:{s:4:"prop";i:42;}'
    // *     example 8: serialize(new Array());
    // *     returns 8: 'a:0:{}'
    // *     example 9: serialize([1, 3]);
    // *     returns 9: 'a:2:{i:0;i:1;i:1;i:3;}'
    // *     example 10: serialize(undefined);
    // *     returns 10: 'N;'
    // *     example 11: serialize(null);
    // *     returns 11: 'N;'
    // *     example 12: serialize(NaN);
    // *     returns 12: false;
    // *     example 13: serialize(Infinity);
    // *     returns 13: false;
    // *     example 14: serialize(Array);
    // *     returns 14: false;
    // *     example 15: serialize(function doit() {});
    // *     returns 15: false;
    // *     example 16: serialize(/./);
    // *     returns 16: false;

    switch (typeof(mixed_val)){
        case "number":
            if (isNaN(mixed_val) || !isFinite(mixed_val)){
                return false;
            } else{
                return (Math.floor(mixed_val) == mixed_val ? "i" : "d") + ":" + mixed_val + ";";
            }
        case "string":
            return "s:" + mixed_val.length + ":\"" + mixed_val + "\";";
        case "boolean":
            return "b:" + (mixed_val ? "1" : "0") + ";";
        case "object":
            if (mixed_val == null) {
                return "N;";
            } else if (mixed_val instanceof Array) {
                var idxobj = { idx: -1 };
                return "a:" + mixed_val.length + ":{" + mixed_val.map( function ( item ) {
                        this.idx++;
                        var ser = serialize(item);

                        return ser ? serialize(this.idx) + ser : false;
                    }, idxobj).filter( function ( item ) {
                        return item;
                    }).join("") + "}";
            }
            else {
                var class_name = get_class(mixed_val);

                if (class_name == undefined){
                    return false;
                }

                var props = new Array();
                for (var prop in mixed_val) {
                    var ser = serialize(mixed_val[prop]);

                    if (ser) {
                        props.push(serialize(prop) + ser);
                    }
                }
                return "O:" + class_name.length + ":\"" + class_name + "\":" + props.length + ":{" + props.join("") + "}";
            }
        case "undefined":
            return "N;";
    }

    return false;
}

function setcookie(name, value, expires, path, domain, secure) {
    // Send a cookie
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_setcookie/
    // +       version: 801.1916
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: setcookie('author_name', 'Kevin van Zonneveld');
    // *     returns 1: true

    expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
    var r = [name + "=" + escape(value)], s, i;
    for(i in s = {expires: expires, path: path, domain: domain}){
        s[i] && r.push(i + "=" + s[i]);
    }
    return secure && r.push("secure"), document.cookie = r.join(";"), true;
}

function sha1 ( str ) {
    // Calculate the sha1 hash of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sha1/
    // +       version: 801.1916
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // -    depends on: utf8_encode
    // *     example 1: sha1('Kevin van Zonneveld');
    // *     returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'

    function rotate_left(n,s) {
        var t4 = ( n<<s ) | (n>>>(32-s));
        return t4;
    }

    function lsb_hex(val) {
        var str="";
        var i;
        var vh;
        var vl;

        for( i=0; i<=6; i+=2 ) {
            vh = (val>>>(i*4+4))&0x0f;
            vl = (val>>>(i*4))&0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    }

    function cvt_hex(val) {
        var str="";
        var i;
        var v;

        for( i=7; i>=0; i-- ) {
            v = (val>>>(i*4))&0x0f;
            str += v.toString(16);
        }
        return str;
    }

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    str = utf8_encode(str);
    var str_len = str.length;

    var word_array = new Array();
    for( i=0; i<str_len-3; i+=4 ) {
        j = str.charCodeAt(i)<<24 | str.charCodeAt(i+1)<<16 |
        str.charCodeAt(i+2)<<8 | str.charCodeAt(i+3);
        word_array.push( j );
    }

    switch( str_len % 4 ) {
        case 0:
            i = 0x080000000;
        break;
        case 1:
            i = str.charCodeAt(str_len-1)<<24 | 0x0800000;
        break;
        case 2:
            i = str.charCodeAt(str_len-2)<<24 | str.charCodeAt(str_len-1)<<16 | 0x08000;
        break;
        case 3:
            i = str.charCodeAt(str_len-3)<<24 | str.charCodeAt(str_len-2)<<16 | str.charCodeAt(str_len-1)<<8    | 0x80;
        break;
    }

    word_array.push( i );

    while( (word_array.length % 16) != 14 ) word_array.push( 0 );

    word_array.push( str_len>>>29 );
    word_array.push( (str_len<<3)&0x0ffffffff );

    for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
        for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
        for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for( i= 0; i<=19; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=20; i<=39; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=40; i<=59; i++ ) {
            temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        for( i=60; i<=79; i++ ) {
            temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B,30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
    return temp.toLowerCase();
}

function sha1_file ( str_filename ) {
    // Calculate the sha1 hash of a file
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sha1_file/
    // +       version: 802.416
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: file_get_contents
    // -    depends on: sha1
    // -    depends on:  utf8_encode
    // *     example 1: sha1_file('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '40bd001563085fc35165329ea1ff5c5ecbdbbeef'

    return sha1(file_get_contents(str_filename));
}

function shuffle( array ) {
    // Shuffle an array
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_shuffle/
    // +       version: 801.1916
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: shuffle(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return true;
}

function soundex( str ) {
    // Calculate the soundex key of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_soundex/
    // +       version: 801.922
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // *     example 1: soundex('Kevin');
    // *     returns 1: 'K150'

    var i, j, l, r, p = isNaN(p) ? 4 : p > 10 ? 10 : p < 4 ? 4 : p,
    m = {BFPV: 1, CGJKQSXZ: 2, DT: 3, L: 4, MN: 5, R: 6},
    r = (s = str.toUpperCase().replace(/[^A-Z]/g, "").split("")).splice(0, 1);
    for(i = -1, l = s.length; ++i < l;){
        for(j in m){
            if(j.indexOf(s[i]) + 1 && r[r.length-1] != m[j] && r.push(m[j])){
                break;
            }
        }
    }
    return r.length > p && (r.length = p), r.join("") + (new Array(p - r.length + 1)).join("0");
}

function sprintf( ) {
    // Return a formatted string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_sprintf/
    // +       version: 801.1314
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // *     example 1: sprintf("%01.2f", 123.1);
    // *     returns 1: 123.10

    function pad(str, len, chr, leftJustify) {
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    }

    function justify(value, prefix, leftJustify, minWidth, zeroPad) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
            value = pad(value, minWidth, ' ', leftJustify);
            } else {
            value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    }

    function formatBaseX(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0;
        prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    }

    function formatString(value, leftJustify, minWidth, precision, zeroPad) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad);
    }

    var regex = /%%|%(\d+\$)?([-+#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments, i = 0, format = a[i++];

    return format.replace(regex, function(substring, valueIndex, flags, minWidth, _, precision, type) {
        if (substring == '%%') return '%';

        // parse flags
        var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false;
        for (var j = 0; flags && j < flags.length; j++) switch (flags.charAt(j)) {
            case ' ': positivePrefix = ' '; break;
            case '+': positivePrefix = '+'; break;
            case '-': leftJustify = true; break;
            case '0': zeroPad = true; break;
            case '#': prefixBaseX = true; break;
        }

        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0;
        } else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }

        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }

        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }

        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : void(0);
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }

        // grab value using valueIndex if required?
        var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

        switch (type) {
            case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad);
            case 'c': return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
            case 'b': return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'o': return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'x': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'X': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
            case 'u': return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'i':
            case 'd': {
                      var number = parseInt(+value);
                      var prefix = number < 0 ? '-' : positivePrefix;
                      value = prefix + pad(String(Math.abs(number)), precision, '0', false);
                      return justify(value, prefix, leftJustify, minWidth, zeroPad);
                  }
            case 'e':
            case 'E':
            case 'f':
            case 'F':
            case 'g':
            case 'G':
                      {
                      var number = +value;
                      var prefix = number < 0 ? '-' : positivePrefix;
                      var method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
                      var textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
                      value = prefix + Math.abs(number)[method](precision);
                      return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
                  }
            default: return substring;
        }
    });
}


function str_pad( input, pad_length, pad_string, pad_type ) {
    // Pad a string to a certain length with another string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_pad/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
    // *     returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
    // *     example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
    // *     returns 2: '------Kevin van Zonneveld-----'

    var half = '', pad_to_go;

    function str_pad_repeater(s, len){
        var collect = '', i;

        while(collect.length < len) collect += s;
        collect = collect.substr(0,len);

        return collect;
    }

    if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') { pad_type = 'STR_PAD_RIGHT'; }
    if ((pad_to_go = pad_length - input.length) > 0) {
        if (pad_type == 'STR_PAD_LEFT') { input = str_pad_repeater(pad_string, pad_to_go) + input; }
        else if (pad_type == 'STR_PAD_RIGHT') { input = input + str_pad_repeater(pad_string, pad_to_go); }
        else if (pad_type == 'STR_PAD_BOTH') {
            half = str_pad_repeater(pad_string, Math.ceil(pad_to_go/2));
            input = half + input + half;
            input = input.substr(0, pad_length);
        }
    }

    return input;
}

function str_repeat ( input, multiplier ) {
    // Repeat a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_repeat/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_repeat('-=', 10);
    // *     returns 1: '-=-=-=-=-=-=-=-=-=-='

    var buf = '';

    for (i=0; i < multiplier; i++){
        buf += input;
    }

    return buf;
}

function str_replace ( search, replace, subject ) {
    // Replace all occurrences of the search string with the replacement string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_replace/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'

    var result = "";
    var prev_i = 0;
    for (i = subject.indexOf(search); i > -1; i = subject.indexOf(search, i)) {
        result += subject.substring(prev_i, i);
        result += replace;
        i += search.length;
        prev_i = i;
    }

    return result + subject.substring(prev_i, subject.length);
}

function str_rot13( str ) {
    // Perform the rot13 transform on a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_str_rot13/
    // +       version: 801.2221
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // *     example 1: str_rot13('Kevin van Zonneveld');
    // *     returns 1: 'Xriva ina Mbaariryq'
    // *     example 2: str_rot13('Xriva ina Mbaariryq');
    // *     returns 2: 'Kevin van Zonneveld'

    return str.replace(/[A-Za-z]/g, function (c) {
        return String.fromCharCode((((c = c.charCodeAt(0)) & 223) - 52) % 26 + (c & 32) + 65);
    });
}

function strcmp ( str1, str2 ) {
    // Binary safe string comparison
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strcmp/
    // +       version: 801.3118
    // +   original by: _argos
    // *     example 1: strcmp( 'waldo', 'Waldo' );
    // *     returns 1: 1
    // *     example 2: strcmp( 'Waldo', 'waldo' );
    // *     returns 2: -1
    // *     example 3: strcmp( 'waldo', 'waldo' );
    // *     returns 3: 0

    var size1 = str1.charCodeAt ( 0 );
    var size2 = str2.charCodeAt ( 0 );

    return ( ( size1 == size2 ) ? 0 : ( ( size1 > size2 ) ? 1 : -1 ) );
}

function strip_tags( str ){
    // Strip HTML and PHP tags from a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strip_tags/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strip_tags('Kevin <br />van <i>Zonneveld</i>');
    // *     returns 1: 'Kevin van Zonneveld'

    return str.replace(/<\/?[^>]+>/gi, '');
}

function stripslashes( str ) {
    // Un-quote string quoted with addslashes()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stripslashes/
    // +       version: 802.1208
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"

    return str.replace('/\0/g', '0').replace('/\(.)/g', '$1');
}

function stristr( haystack, needle, bool ) {
    // Case-insensitive strstr()
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_stristr/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: stristr('Kevin van Zonneveld', 'Van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: stristr('Kevin van Zonneveld', 'VAN', true);
    // *     returns 2: 'Kevin '

    var pos = 0;

    pos = haystack.toLowerCase().indexOf( needle.toLowerCase() );
    if( pos == -1 ){
        return false;
    } else{
        if( bool ){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
}

function strlen( string ){
    // Get string length
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strlen/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strlen('Kevin van Zonneveld');
    // *     returns 1: 19

    return string.length;
}

function strpos( haystack, needle, offset){
    // Find position of first occurrence of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strpos/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
    // *     returns 1: 14

    var i = haystack.indexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}

function strrev( string ){
    // Reverse a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrev/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strrev('Kevin van Zonneveld');
    // *     returns 1: 'dlevennoZ nav niveK'

    var ret = '', i = 0;

    for ( i = string.length-1; i >= 0; i-- ){
       ret += string.charAt(i);
    }

    return ret;
}


function strripos( haystack, needle, offset){
    // Find position of last occurrence of a case-insensitive string in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strripos/
    // +       version: 802.109
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strripos('Kevin van Zonneveld', 'E');
    // *     returns 1: 16

    var i = haystack.toLowerCase().lastIndexOf( needle.toLowerCase(), offset ); // returns -1
    return i >= 0 ? i : false;
}

function strrpos( haystack, needle, offset){
    // Find position of last occurrence of a char in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strrpos/
    // +       version: 802.109
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16

    var i = haystack.lastIndexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}

function strstr( haystack, needle, bool ) {
    // Find first occurrence of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strstr/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strstr('Kevin van Zonneveld', 'van');
    // *     returns 1: 'van Zonneveld'
    // *     example 2: strstr('Kevin van Zonneveld', 'van', true);
    // *     returns 2: 'Kevin '

    var pos = 0;

    pos = haystack.indexOf( needle );
    if( pos == -1 ){
        return false;
    } else{
        if( bool ){
            return haystack.substr( 0, pos );
        } else{
            return haystack.slice( pos );
        }
    }
}

function strtolower( str ) {
    // Make a string lowercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtolower/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtolower('Kevin van Zonneveld');
    // *     returns 1: 'kevin van zonneveld'

    return str.toLowerCase();
}

function strtoupper( str ) {
    // Make a string uppercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_strtoupper/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: strtoupper('Kevin van Zonneveld');
    // *     returns 1: 'KEVIN VAN ZONNEVELD'

    return str.toUpperCase();
}

function substr_count( haystack, needle, offset, length ) {
    // Count the number of substring occurrences
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_substr_count/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: substr_count('Kevin van Zonneveld', 'K', 1);
    // *     returns 2: 0
    // *     example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false

    var pos = 0, cnt = 0;

    if(isNaN(offset)) offset = 0;
    if(isNaN(length)) length = 0;
    offset--;

    while( (offset = haystack.indexOf(needle, offset+1)) != -1 ){
        if(length > 0 && (offset+needle.length) > length){
            return false;
        } else{
            cnt++;
        }
    }

    return cnt;
}

function trim( str ) {
    // Strip whitespace (or other characters) from the beginning and end of a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_trim/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'

    return str.replace(/(^[\s\xA0]+|[\s\xA0]+$)/g, '');
}

function ucfirst( str ) {
    // Make a string&#039;s first character uppercase
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ucfirst/
    // +       version: 801.3120
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'

    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1, str.length-1);
}

function ucwords( str ) {
    // Uppercase the first character of each word in a string
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_ucwords/
    // +       version: 801.3119
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: _argos
    // *     example 1: ucwords('kevin van zonneveld');
    // *     returns 1: 'Kevin Van Zonneveld'

    return str.replace(/^(.)|\s(.)/g, function ( $1 ) { return $1.toUpperCase ( ); } );
}

function utf8_decode ( str_data ) {
    // Converts a string with ISO-8859-1 characters encoded with UTF-8   to single-byte
    // ISO-8859-1
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_utf8_decode/
    // +       version: 801.922
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    var string = "", i = 0, c = c1 = c2 = 0;

    while ( i < str_data.length ) {
        c = str_data.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if((c > 191) && (c < 224)) {
            c2 = str_data.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return string;
}

function utf8_encode ( str_data ) {
    // Encodes an ISO-8859-1 string to UTF-8
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_utf8_encode/
    // +       version: 801.922
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'

    str_data = str_data.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < str_data.length; n++) {
        var c = str_data.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }

    return utftext;
}

function wordwrap( str, int_width, str_break, cut ) {
    // Wraps a string to a given number of characters
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_wordwrap/
    // +       version: 801.922
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Nick Callen
    // *     example 1: wordwrap('Kevin van Zonneveld', 6, '|', true);
    // *     returns 1: 'Kevin |van Zo|nnevel|d'

    var i, j, s, r = str.split("\n");
    if(int_width > 0) for(i in r){
        for(s = r[i], r[i] = ""; s.length > int_width;
            j = cut ? int_width : (j = s.substr(0, int_width).match(/\S*$/)).input.length - j[0].length || int_width,
            r[i] += s.substr(0, j) + ((s = s.substr(j)).length ? str_break : "")
        );
        r[i] += s;
    }
    return r.join("\n");
}

