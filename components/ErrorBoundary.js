import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text } from 'react-native';
import CapsuleButton from './CapsuleButton';

function ErrorFallback({ error, resetErrorBoundary }) {
  // You can customize the error message and handling here.
  const [loading, setLoading] = useState(false)
  
  return (
    <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
      <Text style={{color: "red", fontFamily: "AndikaBold", fontSize: 17, marginBottom: 10}}>Oops! Something went wrong:</Text>
      <Text style={{fontFamily: "Andika", fontSize: 16}}>{error.message}</Text>
      {/* <Text style={{fontFamily: "Andika", fontSize: 16, marginTop: 5}}>{error}</Text> */}
      <CapsuleButton onPress={() => {
        setLoading(true)
        resetErrorBoundary()
        setLoading(prev => false)
      }} loading={loading} >Try again</CapsuleButton>
    </View>
  );
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
