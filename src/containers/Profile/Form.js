import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Button from '../../commons/components/Buttons/Button';
import ReduxFormInput from '../../commons/components/Input/ReduxFormInput';


class EditProfileForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <ScrollView>
        <Field
          placeholder='Nombre'
          label='Nombre'
          name='name'
          component={ReduxFormInput}
        />
        <Field
          placeholder='Email'
          label='Email'
          name='email'
          component={ReduxFormInput}
        />
        <Field
          placeholder='Ciudad'
          label='Ciudad'
          name='city'
          component={ReduxFormInput}
        />
        <Field
          placeholder='Pais'
          label='Pais'
          name='country'
          component={ReduxFormInput}
        />
        <Field
          placeholder='Escuela'
          label='Escuela'
          name='school'
          component={ReduxFormInput}
        />
        <Field
          placeholder='Edad'
          label='Edad'
          name='age'
          component={ReduxFormInput}
        />
        <Field
          placeholder='Nombre de Usuario'
          label='Nombre de Usuario'
          name='username'
          component={ReduxFormInput}
        />
        <Button title="Guardar" onPress={handleSubmit} />
      </ScrollView>
    );
  }
}

EditProfileForm.propTypes = {
  handleSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  initialValues: {
    name: state.user.profile.name,
    email: state.user.profile.email,
    city: state.user.profile.city,
    country: state.user.profile.country,
    school: state.user.profile.school,
    age: state.user.profile.age,
    username: state.user.profile.username,
  },
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'EditProfileForm',
  })(EditProfileForm),
);
