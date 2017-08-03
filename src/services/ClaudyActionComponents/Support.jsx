
import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

export class Support extends Component {
  constructor (props) {
    super(props)
    this.state = { hideContent: false }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount () {
    this.onOpen()
  }

  componentWillReceiveProps (nextProps) {
    nextProps.opened
      ? this.onOpen() : this.onReturn()
  }

  resize () {
    typeof this.props.resizeIntent === 'function' && this.props.resizeIntent({
      height: 27.5 * 16 // 27.5em
    }, '.2s .2s ease-out')
  }

  onOpen () {
    this.resize()
    this.setState({ hideContent: false })
    const listenerToFocus = (e) => {
      if (e.propertyName === 'transform') {
        if (this.messageInput && this.messageInput.focus) this.messageInput.focus()
        e.target.removeEventListener('transitionend', listenerToFocus)
      }
    }
    this.props.contener.addEventListener('transitionend', listenerToFocus, false)
  }

  onReturn () {
    this.props.resizeIntentDefault()
    const listenerToHide = (e) => {
      if (e.propertyName === 'transform') {
        this.setState({ hideContent: true })
        e.target.removeEventListener('transitionend', listenerToHide)
      }
    }
    this.props.contener.addEventListener('transitionend', listenerToHide, false)
  }

  sendMessage () {
    this.props.onActionClick()
  }

  render () {
    const { t, action, iconSrc } = this.props
    const { hideContent } = this.state
    return (
      <div className='coz-claudy-menu-action-description coz-claudy-menu-action--support'>
        <div className='coz-claudy-menu-action-description-header'>
          <img
            className='coz-claudy-menu-action-icon'
            src={iconSrc}
          />
          <p className='coz-claudy-menu-action-title'>
            {t(`claudy.actions.${action.slug}.title`)}
          </p>
        </div>
        {!hideContent &&
          <div className='coz-claudy-menu-action-description-content coz-form'>
            <label className='coz-form-label'>
              {t('claudy.actions.support.fields.message.title')}
              <textarea
                className='set-services-claudy-textarea'
                ref={(input) => { this.messageInput = input }}
                placeholder={t('claudy.actions.support.fields.message.placeholder')}
              />
            </label>
            <label className='coz-form-label'>
              {t('claudy.actions.support.fields.email.title')}
              <input
                type='email'
                placeholder={t('claudy.actions.support.fields.email.placeholder')}
              />
            </label>
            <button
              role='button'
              className='coz-btn-regular coz-btn-send'
            >
              {t('claudy.actions.support.button')}
            </button>
          </div>
        }
      </div>
    )
  }
}

export default translate()(Support)
