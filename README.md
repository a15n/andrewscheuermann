Personal Site
=========
This is [my personal site](http://andrewscheuermann.com/). I'm awesome. Hire me.

Primary Features
---------
* **Parralax Scrolling**: The landing page features parralex scrolling and is a visual representation of my resume and my story of how I got involved with coding.Big thank you to [Petr Tichy](http://ihatetomatoes.net/simple-parallax-scrolling-tutorial/) for the parralax scrolling tutorial.
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

