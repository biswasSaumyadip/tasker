String.prototype.capitalize = function (): string {
	if (!this) return '';
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};
