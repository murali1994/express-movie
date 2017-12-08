let should = require("chai").should(),
  expect = require("chai").expect, 
 // assert = require("chai").assert,
 supertest = require("supertest"),
 app = require("../index"); 
 var url = supertest("http://localhost:3000");
 describe("Testing the route", function(err){
     it("should check the type of the object",function(done){
        url
         .get("/search?moviename : pokiri")  
         .expect(200)     
         .expect('Content-Type', /json/)  
         .end(function(err,res){
             should.not.exist(err);    
             var myObj = res.text;    
           expect(typeof(myObj)).to.deep.equal("string");  
       done();  
    }); 
 });
      it("checking status code",function(done){
         url
         .get("/search")
         .expect(200)
         .end(function(err,res){
            done(); 
         });
            
      });
});