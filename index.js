var compile_btn = document.getElementById("compile_btn");
    var textarea = document.getElementById("textarea");
    var outputSpace = document.getElementById("outputSpace");
    var langOptions = document.getElementById("langOptions");

    compile_btn.addEventListener("click",sendRequest);
    

    function sendRequest(){
    compile_btn.innerText="RUNNING";
    compile_btn.style.boxShadow="0 10px 10px rgb(255, 123, 0)";
    textarea.style.boxShadow="0 10px 10px rgb(255, 123, 0)";
    
       var code = textarea.value;
       var idLang = langOptions.value
        var request = new XMLHttpRequest();

        request.open("POST", "https://codequotient.com/api/executeCode");

        request.setRequestHeader('Content-Type', 'application/json');
        request.send( JSON.stringify({
            "code" : code , 
            langId : idLang
                    })
                );


            //callback1:
            request.addEventListener("readystatechange", function(event){

            if(this.readyState === 4) {
            var codeId = JSON.parse(event.target.responseText).codeId;

            //  alert(codeId);


            const result = setTimeout(function(){
            

                var req2 = new XMLHttpRequest();
                req2.open("GET", `https://codequotient.com/api/codeResult/${codeId}`);
                req2.send();

                req2.addEventListener("readystatechange", function(event)
                {
                if(this.readyState === 4) {
                var data2 = JSON.parse(JSON.parse(event.target.responseText).data);
                console.log(data2);

                compile_btn.innerText="Compile & Run";
                compile_btn.style.boxShadow="none";
                textarea.style.boxShadow="none";


                if('output' in data2)
                        {
                            if(data2.output !== "")
                            {
                                outputSpace.innerText="";                                                   
                                outputSpace.innerText=data2.output;
                                outputSpace.style.color="white";
                                
                            }
                            else  
                            {
                            outputSpace.innerText="";
                            outputSpace.innerText=data2.errors;
                            outputSpace.style.color="red";
                            }

                        }
                }
                });

                },3000);
                }

            })                                       

      
                 }
