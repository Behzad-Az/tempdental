import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect(state => ({
  modals: state.applControlBar.get('modals')
}))

export default class ResumeModal extends Component {
  static propTypes = {
    modals: PropTypes.object,
    toggleModal: PropTypes.func,
    dispatch: PropTypes.func
  }

  render() {
    const { modals, toggleModal } = this.props;
    return (
      <div className={modals.resumeModal ? 'modal is-active' : 'modal'}>
        <div className='modal-background' onClick={toggleModal} />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Resume Modal</p>
            <button className='delete' aria-label='close' onClick={toggleModal} />
          </header>
          <section className='modal-card-body'>

           <div className='field'>
              <label className='label'>
                Introduction:
              </label>
              <p className='control'>
                <textarea
                  className='textarea'
                  name='introduction'
                  defaultValue={null}
                  placeholder='Example: I have three years of experience'
                  onChange={null} />
              </p>
            </div>

            <div className='field'>
              <label className='label'>
                Skills:
              </label>
              <p className='control'>
                <textarea
                  className='textarea'
                  name='introduction'
                  defaultValue={null}
                  placeholder='Example: MS Office'
                  onChange={null} />
              </p>
            </div>

            <div className='file has-name'>
              <label className='file-label'>
                <input className='file-input' type='file' name='resume' />
                <span className='file-cta'>
                  <span className='file-icon'>
                    <i className='fa fa-upload' />
                  </span>
                  <span className='file-label'>
                    Choose a file…
                  </span>
                </span>
                <span className='file-name'>
                  my_resume.pdf
                </span>
              </label>
            </div>

          </section>
          <footer className='modal-card-foot'>
            <button className='button is-success'>Save changes</button>
            <button className='button' onClick={toggleModal}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }
}
