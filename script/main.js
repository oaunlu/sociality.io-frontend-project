fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        let keys = Object.keys(data.posts_by_date).reverse()
        let posts = Object.values(data.posts_by_date).reverse()
        console.log(posts[0].map(postTemplate).join(" "))

        function postTemplate(p){
            var json_date = new Date(p.published_at)
            var date = json_date.toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'}) + " - " 
                     + json_date.toLocaleTimeString('en-GB', {hour: 'numeric', minute: 'numeric'})
            return `
                <div class="post">
                    <p>
                        ${date}
                        <br/>
                        ${p.entry.message}
                    </p>
                    <img class="post-photo" src="${p.entry.image[0]}" 
                        onerror="if (this.src != 'Frontend Developer Project Assets/no-post-image.png') 
                        this.src = 'Frontend Developer Project Assets/no-post-image.png';">
                </div>
            `
        }

        document.getElementById("app").innerHTML = `
            <span>
                ${new Date(keys[0]).toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'})}
                ${posts[0].map(postTemplate).join(" ")}
                ${new Date(keys[1]).toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'})}
                ${posts[1].map(postTemplate).join(" ")}
            </span>
        `  
    })
    .catch(function(error){
        console.error(error);
    });
