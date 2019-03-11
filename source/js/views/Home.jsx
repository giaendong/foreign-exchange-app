import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getLatestExchange } from 'sagas/Exchange/actions';
import LoaderDots from 'components/global/LoaderDots';

@connect(state => ({
  latestExchangeLoad: state.exchange.get('latestExchangeLoad'),
  latestExchangeData: state.exchange.get('latestExchangeData'),
  latestExchangeError: state.exchange.get('latestExchangeError'),
}))

export default class Home extends Component {
  static propTypes = {
    latestExchangeLoad: PropTypes.bool,
    latestExchangeError: PropTypes.bool,
    latestExchangeData: PropTypes.object,
    dispatch: PropTypes.func,
  }
  constructor() {
    super();
    this.state = {
      base: 'USD',
      currencyValue: 10.00,
      rates: [],
      openSelectRates: false,
      selectedAddRates: '',
    };
    this.handleSelectCurrency = this.handleSelectCurrency.bind(this);
    this.handleCurrencyValue = this.handleCurrencyValue.bind(this);
    this.handleOpenAddButton = this.handleOpenAddButton.bind(this);
    this.handleSelectRates = this.handleSelectRates.bind(this);
    this.handleAddRates = this.handleAddRates.bind(this);
    this.handleRemoveRates = this.handleRemoveRates.bind(this);
    this.renderCurrencies = this.renderCurrencies.bind(this);
    this.renderRates = this.renderRates.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getLatestExchange(this.state.base));
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    const { base } = this.state;
    if (base !== prevState.base) {
      dispatch(getLatestExchange(base));
    }
  }

  handleSelectCurrency(e) {
    this.setState({
      base: e.target.value,
    });
  }

  handleOpenAddButton() {
    this.setState({
      openSelectRates: true,
    });
  }

  handleCurrencyValue(e) {
    this.setState({
      currencyValue: e.target.value,
    });
  }

  handleSelectRates(e) {
    this.setState({
      selectedAddRates: e.target.value,
    });
  }

  handleAddRates() {
    const { selectedAddRates, rates } = this.state;
    rates.push(selectedAddRates);
    if (selectedAddRates) {
      this.setState({
        rates,
        openSelectRates: false,
      });
    }
  }

  handleRemoveRates(e) {
    const { rates } = this.state;
    if (e.target.value) {
      rates.splice(rates.indexOf(e.target.value), 1);
      this.setState({
        rates,
      });
    }
  }

  renderCurrencies(cur) {
    const { base } = this.state;
    return (cur === base ? null : <option value={ cur } key={ cur }>{cur}</option>);
  }

  renderRates(rate) {
    const { latestExchangeData } = this.props;
    const { base, currencyValue } = this.state;
    if (base === rate) {
      return null;
    }
    return (
      <div className='row justify-content-md-center mb-2' key={ rate }>
        <div className='col-8 bg-white pt-2 rounded-left'>
          <h5>
            {rate}
            <span className='float-right'>
              {(currencyValue * latestExchangeData.rates[rate]).toFixed(4)}
            </span>
          </h5>
          <p>1 {base} = {rate} {latestExchangeData.rates[rate]}</p>
        </div>
        <div className='col-1 bg-dark text-light py-3 rounded-right'>
          <button
            type='button'
            className='btn btn-outline-danger btn-block'
            onClick={ this.handleRemoveRates }
            value={ rate }
          >-
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { latestExchangeData, latestExchangeError, latestExchangeLoad } = this.props;
    const {
      base, currencyValue, rates, openSelectRates, selectedAddRates,
    } = this.state;
    let currencies = [];
    let filterCurrencies = [];
    if (latestExchangeData.rates) {
      currencies = Object.keys(latestExchangeData.rates);
      filterCurrencies = currencies.filter((el) => !rates.includes(el));
    }
    return (
      <div className='container py-5'>
        <div className='row justify-content-md-center mb-5'><h3>Foreign Exchange Currency AppExercise</h3></div>
        <div className='row justify-content-md-center'>
          <div className='col-md-auto'>
            <div className='row'>
              <div className='input-group mb-3 col-6'>
                <div className='input-group-prepend'>
                  {/*
                  https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md#rule-details
                  */}
                  <label className='input-group-text' htmlFor='inputGroupSelectCurrencies'>Select Currency</label> {/* eslint-disable-line */}
                </div>
                <select
                  className='custom-select'
                  id='inputGroupSelectCurrencies'
                  aria-label='Currencies select with button'
                  defaultValue={ base }
                  onChange={ this.handleSelectCurrency }
                >
                  <option value={ base }>{ base }</option>
                  {
                    currencies.map((cur) => {
                      return this.renderCurrencies(cur);
                    })
                  }
                </select>
              </div>
              <div className='input-group mb-3 col-6'>
                <div className='input-group-prepend'>
                  <span className='input-group-text' id='inputGroupCurrencyValue'>Value</span>
                </div>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Currency Value'
                  aria-label='Currency Value'
                  aria-describedby='inputGroupCurrencyValue'
                  min='1'
                  step='0.01'
                  defaultValue={ currencyValue }
                  onChange={ this.handleCurrencyValue }
                />
              </div>
            </div>
            <div className='card bg-light mb-3'>
              <div className='card-header'>
                { base } <span className='float-right'>Value</span>
                <p>{latestExchangeData.date}<span className='float-right'>{ currencyValue }</span></p>
              </div>
              {
                latestExchangeLoad ?
                  <LoaderDots /> :
                  <div className='card-body'>
                    { latestExchangeError ? 'Error Fetching Data. Please Contact Your Administrator' : null}
                    {
                      rates ?
                      rates.map((rate) => {
                        return this.renderRates(rate);
                      }) : null
                    }
                    <div className='row justify-content-md-center'>
                      <div className='col-8 pt-2 rounded-left'>
                        {
                          openSelectRates ?
                            <div className='input-group'>
                              <select
                                className='custom-select'
                                id='inputGroupSelectAddCurrencies'
                                aria-label='input Group Select Add Currencies'
                                defaultValue={ selectedAddRates }
                                onChange={ this.handleSelectRates }
                              >
                                <option value=''>Choose...</option>
                                {
                                  filterCurrencies.map((cur) => {
                                    return this.renderCurrencies(cur);
                                  })
                                }
                              </select>
                              <div className='input-group-append'>
                                <button
                                  className='btn btn-outline-primary'
                                  type='button'
                                  onClick={ this.handleAddRates }
                                >Submit
                                </button>
                              </div>
                            </div>
                          :
                            <button
                              type='button'
                              className='btn btn-outline-primary btn-block'
                              onClick={ this.handleOpenAddButton }
                            >+ Add More Currencies
                            </button>
                        }
                      </div>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
