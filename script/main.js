fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data.posts_by_date)
        let posts1 = [data.posts_by_date["2021-06-17"].map(function(p){return p})][0]
        let posts2 = [data.posts_by_date["2021-07-01"].map(function(p){return p})][0]
        let posts = [data.posts_by_date]
        console.log(posts1.length)
        console.log(posts2.length)

        document.getElementById("app").innerHTML = `
            ${data}
            ${posts2.map(function (p){
                return `
                    <div class="post">
                        <p>
                            ${p.published_at}
                            <br/>
                            ${p.entry.message}
                        </p>
                        <img src="${p.entry.image[0]}">
                    </div>
                `
            }).join(" ")}
            ${data.posts_by_date}
            ${posts1.map(function (p){
                return `
                    <div class="post">
                        <p>
                            ${p.published_at}
                            <br/>
                            ${p.entry.message}
                        </p>
                        <img src="${p.entry.image[0]}">
                    </div>
                `
            }).join(" ")}
        `  
    })
    .catch(function(error){
        console.error(error);
    });


//console.log(posts.posts_by_date["2021-06-17"][0].entry.image[0])