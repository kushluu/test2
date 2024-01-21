import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const baseUrl='http://127.0.0.1:8000'

@Injectable({
  providedIn: 'root'
})
export class PropertydetailsService {

  constructor(private http:HttpClient) { }
  
  GetPropertyDetails() {
    return this.http.get(baseUrl+'/apiapp/');  
  }
  getpropertydetailsby_id(){
    return this.http.get(baseUrl+'/apiapp/id');
  }
 like_post(p:any,c:any){
return this.http.get(baseUrl+'/apiapp/like_func/'+p+'/'+c)
 }
 upload_image(temp:any){
    let formdata=new FormData()
    formdata.append('image',temp)
    return this.http.post(baseUrl+'/api/upload/',formdata)
 }
 upload_user_image(temp:any){
  let formdata=new FormData()
  formdata.append('image',temp)
  return this.http.post(baseUrl+'/apiapp/upload/',formdata)
}

 GetWishList(id:any){
  return this.http.get(baseUrl+'/apiapp/wishlist/'+id)
 }
 delete(id:any,cid:any){
  return this.http.delete(baseUrl+'/apiapp/delete/'+id+'/'+cid)
 }
 GetOnefilterDetails(str:string){
  const url='127.0.0.1:8000/apiapp/onefilter/'
  const body={'str':str}
  return this.http.post(baseUrl+'/apiapp/onefilter',body)
 }
 GetUserPropertyDetails(id:any){
  return this.http.get(baseUrl+'/apiapp/User_properties/'+id)
 }
delete_product(id:any){  
  console.log(baseUrl+'/apiapp/delete_product/'+id);
  return this.http.delete(baseUrl+'/apiapp/delete_product/'+id)
 }
}
