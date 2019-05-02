/**Module getNearBy: filter the given list of locations which is within given kms from a given location
 * parameters : data=> list of locations with location coordinates in degrees following format {latitude:0,longitude:0}
 *              city=> location coordinate of city from where distance to be calculated following format {latitude:0,longitude:0}
 *              distanceToFilter=> maximum distance between city and list of locations in KMs
 * return nearByCities  as filtered list of locations             
  */
function getNearBy(data,city,distanceToFilter){
    if(!data||!city||!distanceToFilter){
        throw Error("Input Mismatch: Please provide all the parameters")
    }
    if(!Array.isArray(data)){
        throw Error("List of locations should be provided as an array of {latitude:0,longitude:0}");
    }
var nearByCities=  data.filter((location)=>{
    var distance=getDistanceFromLatLonInKm(city.latitude,city.longitude,location.latitude,location.longitude);
    return distance <=100;
  });
  return nearByCities;
  }
/**Function getDistanceFromLatLonInKm: return distance between two given location coordinates using Haversine Formula
 * parameters : lat1=> latitude of first location in degree
 *              lon1=> longitude of first location in degree
 *              lat2=> latitude of second location in degree
 *              lon2=> longitude of second location in degree
 * return d as distance in km between the given locations                
  */
 function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Mean Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // converting degree to radian
    var dLon = deg2rad(lon2-lon1); 
  /*  Haversine formula:	
a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2( √a, √(1−a) )
d = R ⋅ c
where	φ is latitude, λ is longitude, R is earth’s radius (mean radius = 6,371km);
note that angles need to be in radians to pass to trig functions!

Source : https://www.movable-type.co.uk/scripts/latlong.html
*/
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  /**Function deg2rad: return corresponding radian value of given degree value
 * parameters : deg=> angle in degree
 * returns radian value of deg          
  */
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  module.exports = getNearBy;
