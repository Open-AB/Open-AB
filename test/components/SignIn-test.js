//this is an enzyme test
//https://github.com/airbnb/enzyme

import SignIn from '../../client/components/SignIn.js';
const expect = require('expect');
import React from 'react';
import { shallow, mount, render } from 'enzyme';

describe("App Component", function() {
  it("should render one h1", function() {
    const wrapper = shallow(<SignIn />);
    expect(wrapper.find('h1').length).toBe(1);
  });
});
