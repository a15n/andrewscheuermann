Personal Site
=========
This is [my personal site](http://andrewscheuermann.com/). I'm pretty awesome.

Primary Features
---------
* **Parralax Scrolling**: The landing page features parralex scrolling and is a visual representation of my resume and the story of how I became a software engineer. Big credit to [Petr Tichy](http://ihatetomatoes.net/simple-parallax-scrolling-tutorial/) for the parralax scrolling tutorial.
```
<!-- HTML -->
<section id="slide-7" class="homeSlide">
	<div class="bcg"
		data-top-bottom="background-position: 50% -100px;"
		data-bottom-top="background-position: 50% 100px;"
		data-anchor-target="#slide-7"
	>
  	<div class="hsContainer">
  		<div class="hsContent"
  			data-center="opacity: 1"
  			data-center-top="opacity: 0"
  			data--100-bottom="opacity: 0;"
  			data-anchor-target="#slide-7"
  		>
    		<h2>Studied at Fullstack Academy, a Javascript focused bootcamp in NYC</h2>
  		</div>
  	</div>
	</div>
</section>
-----------------------------
/* CSS */
#slide-7 h2 {
  position: fixed;
  top: 15%;
  right: 40%;
  bottom: 20%;
  left: 5%;
}
```
* **Optimized Client-Side Performance**: After initially building the site I used [Grunt](http://gruntjs.com/) to reduce the page size from 13.9MB to 4.6MB **(a 67% reduction)** and decrease the load time from 7 seconds to 2.5 seconds **(a 64% reduction)**, both of which were measured before caching. Screenshots of the network tab are included below. I personally crafted my `grunt build` process and have included the code below the images.
INSERT IMAGES HERE
```

```

