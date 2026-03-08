import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	classicThemeIcon,
	darkThemeIcon,
	earthThemeIcon,
	blueThemeIcon,
	orangeThemeIcon,
} from './icons';

const themes = [
  {
    name: 'default',
    icon: classicThemeIcon,
    label: 'Classic',
  },
  {
    name: 'dark',
    icon: darkThemeIcon,
    label: 'Dark',
  },
  {
    name: 'earth',
    icon: earthThemeIcon,
    label: 'Earth',
  },
  {
    name: 'ocean',
    icon: blueThemeIcon,
    label: 'Ocean',
  },
  {
    name: 'sand',
    icon: orangeThemeIcon,
    label: 'Sand',
  }
]

@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
			button {
				display: inline-flex;
				outline: none;
				border: none;
				background-color: transparent;
				border: 2px solid transparent;
				border-radius: 20rem;
				padding: 1px;
				cursor: pointer;
				transition: border var(--theme-transition);
			}
			button[active] {
				border: 2px solid var(--theme-primary);
        box-shadow: 0 0 12px 1px var(--theme-primary);
			}
			button:hover {
				border: 2px solid var(--theme-primary);
			}
			.theme-switcher__container {
				margin: 2rem 0;
				display: grid;
				grid-template-columns: repeat(5, 1fr);
			}
			.theme-select__container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.theme-select__container p {
				font-size: var(--font-size-sm);
			}
		`,
	];

	// set the _doc element
	private _doc = document.firstElementChild;

	@property({ type: String })
	theme: string | null = null;

	private _getCurrentTheme() {
		// check for a local storage theme first
		const localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme !== null) {
			this._setTheme(localStorageTheme);
		} else {
    	// Set default theme to dark if the operating system specifies this preference
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				this._setTheme('dark');
			} else{ // Set to default/light theme if no specification, or light theme is specified
				this._setTheme('default');
			}
    		
    }
	}

  firstUpdated() {
    this._getCurrentTheme();
  }

	private _setTheme(theme) {
    console.log('设置主题:', theme); // 调试信息1
    
    this._doc.setAttribute('data-theme', theme);

    const _heroImage = document.querySelector('#home-hero-image') as HTMLImageElement;
    console.log('找到图片元素:', _heroImage); // 调试信息2
    
    if (!_heroImage) {
      console.error('没找到图片元素！');
      return;
    }
    
    let imagePath = '';
    if (theme === 'default') {
      imagePath = '/images/themes/classic.jpg';
    }
    if (theme === 'dark') {
      imagePath = '/images/themes/dark.jpg';
    }
    if (theme === 'earth') {
      imagePath = '/images/themes/earth.jpg';
    }
    if (theme === 'ocean') {
      imagePath = '/images/themes/ocean.jpg';
    }
    if (theme === 'sand') {
      imagePath = '/images/themes/sand.jpg';
    }
    
    console.log('设置图片路径:', imagePath); // 调试信息3
    _heroImage.src = imagePath;
    console.log('图片已更新'); // 调试信息4
    
    localStorage.setItem('theme', theme);
    this.theme = theme;
	}

	render() {
    const themeButtons = html`${themes.map((theme) => {
      return html`
      <div class="theme-select__container">
        <button
          @click=${() => this._setTheme(theme.name)}
          ?active=${this.theme === theme.name}
          title=${`Enable ${theme.label} Theme`}
        >
          ${theme.icon}
        </button>
        <p>${theme.label}</p>
        </div>
      `
    })}`

		return html`
			<div class="theme-switcher__container">
				${themeButtons}
			</div>
		`;
	}
}