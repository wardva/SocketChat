/**
 * @author Ward Van Assche
 * @date 17/12/2015
 */
'use strict';

exports.index = function(req, res) {
    res.render('home', {
    	active: 'home',
        title: 'Home page'
    });
};

exports.about = function(req, res) {
    res.render('home/about', {
    	active: 'about',
        title: 'About this website'
    });
};

exports.contact = function(req, res) {
    res.render('home/contact', {
    	active: 'contact',
        title: 'Contact us!'
    });
};
