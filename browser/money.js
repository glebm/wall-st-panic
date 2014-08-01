var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var createElement = require('./element.js');
var abspos = require('./abspos.js');

module.exports = Money;
inherits(Money, EventEmitter);

function Money (elem) {
    if (!(this instanceof Money)) return new Money(elem);
    EventEmitter.call(this);
    
    this.element = createElement('g');
    this.element.appendChild(elem);
    
    this.pos = { x: Math.random() * 595 - 485, y: -350 };
    this.v = { x: 0, y: 1 };
    this.tick(0);
}

Money.prototype.appendTo = function (target) {
    target.appendChild(this.element);
    this.apos = abspos(this.element);
};

Money.prototype.tick = function (dt) {
    this.pos.y += dt * this.v.y / 5;
    var tr = this.pos.x + ',' + this.pos.y;
    this.element.setAttribute('transform', 'translate(' + tr + ')');
    if (this.pos.y > 100) this.emit('miss');
};
