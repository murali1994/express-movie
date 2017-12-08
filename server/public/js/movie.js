


let arr = [];       
let set1 = new Set();
        
        function findMovie(e) {
            
            e.preventDefault();// this is to prevent the default action in form
            let movie = document.getElementById('moviename').value;

            $.ajax({

                url: '/search',
                type: 'GET',
                data: {
                    moviename: document.getElementById('moviename').value
                },
                error: function() {
                    $('#movies').html('<p>An error has occurred</p>');
                },
                success: function(data) {
                    console.log(data);

                    let json_obj = $.parseJSON(data); //parse JSON
                    if(json_obj.total_results != 0)
                    {
                    let movieHTML = '';
                    movieHTML += '<tr><th><center>Title</center></th><th><center>Poster</center></th><th><center>Release date</center></th></tr>';
                    for (let i = 0; (i < json_obj.total_results && i < 20); i++) {
                        var poster = '';
                        if (json_obj.results[i].poster_path == null || json_obj.results[i].poster_path == undefined) {
                            poster = "https://www.jainsusa.com/images/store/landscape/not-available.jpg";
                        } else {
                            poster = 'http://image.tmdb.org/t/p/w185/' + json_obj.results[i].poster_path;
                        }
                        let favobj = {
                            title: json_obj.results[i].title,
                            poster: poster,
                            date: json_obj.results[i].release_date
                        };

                        movieHTML += '<tr>';
                        movieHTML += '<td><center>' + json_obj.results[i].title + '</center></td>';
                        movieHTML += '<td><center>' + '<img width = "200" height = "200" src=' + poster + '>' + '</center></td>';
                        movieHTML += '<td><center>' + json_obj.results[i].release_date + '</center></td>';
                        movieHTML += "<td><center><button value='" + JSON.stringify(favobj) + "' onclick='favourite(event)'>Favourite</button></center></td>";
                        movieHTML += '</tr>';
                    }
                    $("#movies tbody").html(movieHTML);

                }
        
        else
        {
             $('#heading').html('<p>No such movie</p>');
        }

}
            });
        
}
        function favourite(e) {
            set1.add(e.target.value);
        }

        function fndisplay() {
            let movieHTML = '';
            movieHTML += '<tr><th><center>Title</center></th><th><center>Poster</center></th><th><center>Release date</center></th></tr>';
            set1.forEach(function(element) {
                let movobj = JSON.parse(element);
                movieHTML += '<tr>';
                movieHTML += '<td><center>' + movobj.title + '</center></td>';
                movieHTML += '<td><center>' + '<img width = "200" height = "200" src=' + movobj.poster + '>' + '</center></td>';
                movieHTML += '<td><center>' + movobj.date + '</center></td>';
                movieHTML += '</tr>';
                 $("#movies tbody").html(movieHTML);
            });
           
           
        }