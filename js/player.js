class Player {
	constructor(x, y, map) {
		this.x = x;
		this.y = y;
		this.width = 64; // La largeur de chaque frame du sprite
		this.height = 64; // La hauteur de chaque frame du sprite
		this.speed = 2;
		this.image = new Image();
		this.image.src = "assets/player/sacha.png"; // Le chemin de la feuille de sprites
		this.map = map;
		this.keys = {}; // État des touches

		this.frameX = 0; // La colonne actuelle dans la feuille de sprites
		this.frameY = 0; // La ligne actuelle dans la feuille de sprites
		this.frameCount = 4; // Le nombre de frames par direction
		this.animSpeed = 10; // Vitesse de l'animation
		this.animCounter = 0; // Compteur pour l'animation

        this.isUp = true; // etat pression touches clavier

		// Ajouter les écouteurs d'événements pour le clavier
		window.addEventListener("keydown", (e) => {
			this.keys[e.key] = true;
			this.isUp = false;
		});
		window.addEventListener("keyup", (e) => {
			this.keys[e.key] = false;
			this.isUp = true;
		});
	}

	update() {
		let newX = this.x;
		let newY = this.y;

		!this.isUp ? this.animCounter++ : this.frameX = 0;
		if (this.animCounter >= this.animSpeed) {
			this.animCounter = 0;
			this.frameX = (this.frameX + 1) % this.frameCount; // Avancer à la prochaine frame
		}

		if (this.keys["ArrowUp"]) {
			newY -= this.speed;
			this.frameY = 3; // Ligne de l'animation vers le haut
		}
		if (this.keys["ArrowDown"]) {
			newY += this.speed;
			this.frameY = 0; // Ligne de l'animation vers le bas
		}
		if (this.keys["ArrowLeft"]) {
			newX -= this.speed;
			this.frameY = 1; // Ligne de l'animation vers la gauche
		}
		if (this.keys["ArrowRight"]) {
			newX += this.speed;
			this.frameY = 2; // Ligne de l'animation vers la droite
		}

		if (this.map.canMoveTo(newX, newY, this.width, this.height)) {
			this.x = newX;
			this.y = newY;
		} else {
			newX = this.x;
			newY = this.y;
		}
	}

	draw(ctx, camera) {
		ctx.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY * this.height, // Position de la frame sur la feuille de sprites
			this.width,
			this.height, // Taille de la frame
			this.x - camera.x,
			this.y - camera.y, // Position de dessin sur le canvas
			this.width,
			this.height // Taille de dessin sur le canvas
		);
	}
}
