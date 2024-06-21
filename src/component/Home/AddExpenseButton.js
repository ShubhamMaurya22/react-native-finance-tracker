import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {SelectList} from 'react-native-dropdown-select-list';
import {Formik, useFormikContext} from 'formik';
import * as yup from 'yup';
import Snackbar from 'react-native-snackbar';

//toolkit
import {addExpense} from '../../features/expenseSlice';
import {useDispatch, store} from 'react-redux';

const AddExpenseButton = () => {
  const [isAddExpenseModalVisible, setAddExpenseModalVisible] = useState(false);
  const [expenseType, setExpenseType] = useState('');
  const [expenseCategory, setexpenseCategory] = useState('');
  const [amount, setamount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const snapPoints = useMemo(() => ['50%', '50%'], []);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop appearOnIndex={0} disappearOnIndex={-1} {...props} />
    ),
    [],
  );

  const bottomSheetRef = useRef(null);

  const openAddExpenseModal = () => {
    setAddExpenseModalVisible(true);
    bottomSheetRef.current?.expand();
  };

  const closeAddExpenseModal = () => {
    setAddExpenseModalVisible(false);
    bottomSheetRef.current?.close();
  };

  const dispatch = useDispatch();

  const handleAddExpense = (type, category, amount) => {
    console.log(type);
    console.log(category);
    console.log(amount);
    dispatch(addExpense({type, category, amount}));

    setAddExpenseModalVisible(false);
    bottomSheetRef.current?.close(); 
    //  resetForm();
  };

  const expenseData = [
    {key: '1', value: 'Expense'},
    {key: '2', value: 'Income'},
  ];

  const renderCatecogryBaseOnExpenceType = () => {
    switch (selectedCategory) {
      case 'Expense':
        return [
          {key: '1', value: 'Food'},
          {key: '2', value: 'Shopping'},
          {key: '3', value: 'Sports'},
          {key: '4', value: 'Beauty and Care'},
          {key: '5', value: 'Others'},
        ];
      case 'Income':
        return [
          {key: 1, value: 'Salary'},
          {key: 2, value: 'Business'},
          {key: 3, value: 'Investment'},
          {key: 4, value: 'Gift'},
          {key: 5, value: 'Others'},
        ];
      default:
        return [];
    }
  };
  // const incomeCatData = [
  //   {key: 1, value: 'Salary'},
  //   {key: 2, value: 'Business'},
  //   {key: 3, value: 'Investment'},
  //   {key: 4, value: 'Gift'},
  //   {key: 5, value: 'Other'},
  // ];

  // const expenseCatData = [
  //   {key: '1', value: 'Food'},
  //   {key: '2', value: 'Shopping'},
  //   {key: '3', value: 'Sports'},
  //   {key: '4', value: 'Beauty and Care'},
  //   {key: '5', value: 'Others'},
  // ];

  const validationSchema = yup.object().shape({
    expenseType: yup.string().required('Expense type is required'),
    category: yup.string().required('Category is required'),
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .required('Amount is required')
      .positive('Amount must be a positive number'),
  });

  // useEffect(() => {
  //   if (isAddExpenseModalVisible) {
  //     // Reset dropdown values when the modal is opened
  //     setExpenseType('');
  //     setexpenseCategory('');
  //   }
  // }, [isAddExpenseModalVisible]);


  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={openAddExpenseModal}>
          <Feather name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <BottomSheet
        detached={false} // attached to bottom 
        ref={bottomSheetRef}
        index={isAddExpenseModalVisible ? 1 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
      >
        <View>
          <Pressable onPress={() => closeAddExpenseModal()}>
            <Text style={styles.crossButton}>X</Text>
          </Pressable>
          <Formik
            initialValues={{expenseType: '', category: '', amount: ''}}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleAddExpense(
                values.expenseType,
                values.category,
                values.amount,
              );
              actions.setErrors({});

              setTimeout(() => {
                actions.resetForm({
                  values: {
                    expenseType: '',
                    category: '',
                    amount: '',
                  },
                });

                // Reset the dropdown states
                setExpenseType('');
                setSelectedCategory('');
              }, 100);
            }}
            validateOnMount={false}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <>
                <View style={styles.selectContainer}>
                  <SelectList
                    // setSelected={(val) => setExpenseType(val)}
                    // key={values.expenseType}
                    key={`expenseType-${isAddExpenseModalVisible}`}
                    setSelected={val => {
                      handleChange('expenseType')(val);
                      setSelectedCategory(val);
                      console.log(`expenseType-${isAddExpenseModalVisible} hello mumbai`);
                    }}
                    data={expenseData}
                    save="value"
                    placeholder="Type"
                    boxStyles={{width: 150, marginRight: 10}}
                    dropdownStyles={styles.dropdown}
                    search={false}
                  />
                  {touched.expenseType &&
                    errors.expenseType &&
                    isSubmitting &&
                    Snackbar.show({
                      text: errors.expenseType,
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: '#FF3E4D',
                    })}

                  <SelectList
                    key={`category-${isAddExpenseModalVisible}-${values.expenseType}`}
                    setSelected={val =>{ handleChange('category')(val)
                  // console.log(`category-${isAddExpenseModalVisible}-${values.expenseType} mera desh badal rah hai`)
                  }}
                    data={renderCatecogryBaseOnExpenceType().map(
                      item => item.value,
                    )}
                    save="value"
                    placeholder="Category"
                    boxStyles={{width: 150}}
                    search={false}
                    dropdownStyles={styles.dropdown}
                  />

                  {touched.category &&
                    errors.category &&
                    isSubmitting &&
                    Snackbar.show({
                      text: errors.category,
                      duration: Snackbar.LENGTH_SHORT,
                      backgroundColor: '#FF3E4D',
                    })}
                </View>
                <BottomSheetTextInput
                  style={styles.input}
                  placeholder=" ₹"
                  keyboardType="decimal-pad"
                  // onChangeText={(num) => setamount(num)}
                  onChangeText={num => handleChange('amount')(num)}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                />

                {touched.amount &&
                  errors.amount &&
                  isSubmitting &&
                  Snackbar.show({
                    text: errors.amount,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: '#FF3E4D',
                  })}

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    position: 'absolute',
    flex: 1,
    right: 0,
    bottom: 0,
    marginBottom: 80,
    marginRight: 16,
  },
  plusButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003049',
    borderRadius: 35,
    bottom: 30,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  crossButton: {
    textAlign: 'right',
    marginRight: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF3E4D',
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    margin: 20,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 40,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)',
    marginHorizontal: 50,
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#000',
    width: 100,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 160,
  },
  submitText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    backgroundColor: 'white',
    zIndex: 2,
    width: 150,
    marginRight: 10,
  },
});
export default AddExpenseButton;
