import get from '../../../tools/get';
import Inferno from '../../../../src';

export default function domComponentsTestsJsx(describe, expect, container) {
	class BasicComponent1 extends Inferno.Component {
		render() {
			return (
				<div className="basic">
					<span className={ this.props.name }>The title is { this.props.title }</span>
				</div>
			);
		}
	}

	describe('should render a basic component', () => {
		beforeEach(() => {
			Inferno.render((
				<div><BasicComponent1 title="abc" name="basic-render" /></div>
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-render">The title is abc</span></div></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<div><BasicComponent1 title="123" name="basic-update" /></div>
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-update">The title is 123</span></div></div>'
			);
		});
	});

	class BasicComponent1b extends Inferno.Component {
		render() {
			return (
				<div className='basic'>
					<label>
						<input checked={ this.props.isChecked } />
						The title is { this.props.title }
					</label>
				</div>
			);
		}
	}

	describe('should render a basic component with inputs', () => {
		beforeEach(() => {
			Inferno.render((
				<div>
					<BasicComponent1b title="abc" isChecked={ true } />
				</div>
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><label><input>The title is abc</label></div></div>'
			);
			expect(
				container.querySelector("input").checked
			).to.equal(
				true
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<div>
					<BasicComponent1b title="123" isChecked={ false } />
				</div>
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><label><input>The title is 123</label></div></div>'
			);
			expect(
				container.querySelector("input").checked
			).to.equal(
				false
			);
		});
		it('Third render (update)', () => {
			Inferno.render((
				<div>
					<BasicComponent1b title="123" isChecked={ true } />
				</div>
			), container);
			expect(
				container.querySelector("input").checked
			).to.equal(
				true
			);
		});
	});

	describe('should render a basic component and remove property if null #1', () => {
		beforeEach(() => {
			Inferno.render((
					<div>
						<BasicComponent1 title='abc' name='basic-render' />
					</div>
				),
				container
			);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-render">The title is abc</span></div></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
					<div>
						<BasicComponent1 title='123' name={ null } />
					</div>
				),
				container
			);
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span>The title is 123</span></div></div>'
			);
		});
	});

	describe('should render a basic component and remove property if null #2', () => {
		beforeEach(() => {
			Inferno.render((
				<div>
					<BasicComponent1 title='abc' name={ null } />
				</div>
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span>The title is abc</span></div></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<div>
					<BasicComponent1 title='123' name='basic-update' />
				</div>
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-update">The title is 123</span></div></div>'
			);
		});
	});

	describe('should render a basic root component', () => {
		beforeEach(() => {
			Inferno.render((
				<BasicComponent1 title='abc' name='basic-render' />
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div class="basic"><span class="basic-render">The title is abc</span></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<BasicComponent1 title='123' name='basic-update' />
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div class="basic"><span class="basic-update">The title is 123</span></div>'
			);
		});
	});

	class BasicComponent2 extends Inferno.Component {
		render() {
			return (
				<div className='basic'>
					<span className={ this.props.name }>The title is { this.props.title }</span>
					{ this.props.children }
				</div>
			);
		}
	}

	describe('should render a basic component with children', () => {
		beforeEach(() => {
			Inferno.render((
				<div>
					<BasicComponent2 title="abc" name="basic-render">
						<span>I'm a child</span>
					</BasicComponent2>
				</div>
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-render">The title is abc</span><span>I\'m a child</span></div></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<div>
					<BasicComponent2 title="123" name="basic-update">
						<span>I'm a child</span>
					</BasicComponent2>
				</div>
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-update">The title is 123</span><span>I\'m a child</span></div></div>'
			);
		});
	});

	describe('should render multiple components', () => {
		beforeEach(() => {
			Inferno.render((
				<div>
					<BasicComponent1 title="component 1" name="basic-render" />
					<BasicComponent1 title="component 2" name="basic-render" />
				</div>
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-render">The title is component 1</span></div>'
				+ '<div class="basic"><span class="basic-render">The title is component 2</span></div></div>'
			);
		});

		it('Second render (update)', () => {
			Inferno.render((
				<div>
					<BasicComponent1 title="component 1" name="basic-render" />
				</div>
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div><div class="basic"><span class="basic-render">The title is component 1</span></div></div>'
			);
		});
	});

	class BasicComponent3 extends Inferno.Component {
		template(createElement, createComponent, styles, title) {
			return createElement("div", {style: styles},
				createElement("span", {style: styles}, "The title is ", title)
			);
		}
		render() {
			return Inferno.createFragment([this.props.styles, this.props.title], this.template);
		}
	}

	describe('should render a basic component with styling', () => {
		beforeEach(() => {
			Inferno.render((
				<BasicComponent3 title="styled!" styles={{ color: "red", padding: 10 }} />
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div style="color: red; padding: 10px;"><span style="color: red; padding: 10px;">The title is styled!</span></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<BasicComponent3 title="styled (again)!" styles={{ color: "blue", margin: 20 }} />
			), container);

			expect(
				container.innerHTML
			).to.equal(
				'<div style="color: blue; margin: 20px;"><span style="color: blue; margin: 20px;">The title is styled (again)!</span></div>'
			);
		});
	});

	describe('should render a basic component and remove styling #1', () => {
		beforeEach(() => {
			Inferno.render((
				<BasicComponent3 title="styled!" styles={{ color: "red", padding: 10 }} />
			), container);
		});

		it('Initial render (creation)', () => {
			expect(
				container.innerHTML
			).to.equal(
				'<div style="color: red; padding: 10px;"><span style="color: red; padding: 10px;">The title is styled!</span></div>'
			);
		});
		it('Second render (update)', () => {
			Inferno.render((
				<BasicComponent3 title="styles are removed!" styles={ null } />
			), container);
			expect(
				container.innerHTML
			).to.equal(
				'<div><span>The title is styles are removed!</span></div>'
			);
		});
	});
}