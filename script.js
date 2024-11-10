new p5(function (sketch) {
  var images = [];
  var imageIndex = 0;
  var position;
  var velocity;

  /**
   * Checks boundary collision.
   *
   * @param {p5.Image} image
   * @return {boolean}
   */
  function checkBoundaryCollision(image) {
    var hasCollision = false;

    // left or right collision
    if (position.x < 0 || position.x + image.width > sketch.width) {
      velocity.x *= -1;
      hasCollision = true;
    }

    // top or bottom collision
    if (position.y < 0 || position.y + image.height > sketch.height) {
      velocity.y *= -1;
      hasCollision = true;
    }

    return hasCollision;
  }

  /**
   * Preload.
   */
  sketch.preload = function () {
    for (var i = 1; i < 6; i++) {
      var image = sketch.loadImage("assets/image" + i + ".png");
      images.push(image);
    }
  };

  /**
   * Setup.
   */
  sketch.setup = function () {
    sketch.createCanvas(window.innerWidth, window.innerHeight);

    // Set random initial position
    position = sketch.createVector(
      sketch.random(0, sketch.width),
      sketch.random(0, sketch.height)
    );

    // Set random initial velocity
    var angle = sketch.random(TWO_PI); // random angle in radians
    velocity = p5.Vector.fromAngle(angle);
    velocity.mult(sketch.random(2, 6)); // random speed between 2 and 6
  };

  /**
   * Draw.
   */
  sketch.draw = function () {
    sketch.background("#111");
    var image = images[imageIndex];
    var hasCollision = checkBoundaryCollision(image);

    if (hasCollision) {
      imageIndex++;
      if (imageIndex >= images.length) {
        imageIndex = 0;
      }
      image = images[imageIndex];
    }

    position.add(velocity);
    sketch.image(image, position.x, position.y);
  };
});