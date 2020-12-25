import Actionsheet from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

// eslint-disable-next-line no-undef
describe('Actionsheet', () => {
  // eslint-disable-next-line no-undef
  it('should render correct contents', () => {
    const wrapper = mount(Actionsheet)
    expect(wrapper.contains('div')).to.equal(true)
  })
})
