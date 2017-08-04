import React, { Component } from 'react'

import Claudy from '../services/Claudy'

export default class IntentView extends Component {
  constructor (props) {
    super(props)
    const { window } = props
    const intentType = window.location.href.match(/.*\/services\/(.*)\?.*/)[1]
    this.setState({ intentType })
    // Maybe the logic about getting the intent from location.search should be
    // encapsulated in cozy.client.createService
    const intent = window.location.search.split('=')[1]
    this.props.createIntentService(intent, window)
  }

  componentDidMount () {
    switch (this.state.intentType) {
      case 'claudy':
        this.props.fetchInfos()
        this.props.fetchClaudy()
    }
  }

  terminate (eventName) {
    const service = this.props.service.instance
    service.terminate()
  }

  render () {
    const { intentType } = this.state
    const { service, claudy, instance } = this.props
    switch (intentType) {
      case 'claudy':
        return <Claudy
          claudyInfos={claudy}
          instanceData={instance && instance.data}
          onClose={() => this.terminate()}
          service={service}
        />
    }
  }
}
