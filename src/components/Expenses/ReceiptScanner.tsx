import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check, Edit, Loader, AlertCircle, FileText, Scan } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card } from '../ui/Card';

interface ReceiptData {
  merchant: string;
  amount: number;
  date: string;
  category: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  taxAmount?: number;
  paymentMethod?: string;
  confidence: number;
}

interface ReceiptScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expenseData: any) => void;
}

const categoryOptions = [
  { value: 'housing', label: 'Housing & Rent' },
  { value: 'groceries', label: 'Groceries & Food' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'education', label: 'Education' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'debt', label: 'Debt Payments' },
  { value: 'savings', label: 'Savings & Investments' },
  { value: 'other', label: 'Other' }
];

// Mock OCR function - in production, this would call an actual OCR service
const mockOCRScan = (imageFile: File): Promise<ReceiptData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate different types of receipts based on filename or random
      const mockReceipts = [
        {
          merchant: 'Woolworths',
          amount: 1247.50,
          date: new Date().toISOString().split('T')[0],
          category: 'groceries',
          items: [
            { name: 'Organic Bananas 1kg', quantity: 1, price: 24.99 },
            { name: 'Free Range Eggs 12s', quantity: 2, price: 45.99 },
            { name: 'Whole Wheat Bread', quantity: 1, price: 18.99 },
            { name: 'Greek Yogurt 500g', quantity: 3, price: 32.99 },
            { name: 'Chicken Breast 1kg', quantity: 1, price: 89.99 }
          ],
          taxAmount: 156.18,
          paymentMethod: 'Card',
          confidence: 0.94
        },
        {
          merchant: 'Shell',
          amount: 850.00,
          date: new Date().toISOString().split('T')[0],
          category: 'transportation',
          items: [
            { name: 'Unleaded Petrol', quantity: 50, price: 17.00 }
          ],
          taxAmount: 113.33,
          paymentMethod: 'Card',
          confidence: 0.89
        },
        {
          merchant: 'Pick n Pay',
          amount: 567.85,
          date: new Date().toISOString().split('T')[0],
          category: 'groceries',
          items: [
            { name: 'Milk 2L', quantity: 2, price: 28.99 },
            { name: 'Bread White', quantity: 1, price: 14.99 },
            { name: 'Apples Red 1kg', quantity: 1, price: 34.99 },
            { name: 'Cheese Cheddar 500g', quantity: 1, price: 67.99 }
          ],
          taxAmount: 75.71,
          paymentMethod: 'Cash',
          confidence: 0.91
        }
      ];
      
      const randomReceipt = mockReceipts[Math.floor(Math.random() * mockReceipts.length)];
      resolve(randomReceipt);
    }, 2000); // Simulate processing time
  });
};

export const ReceiptScanner: React.FC<ReceiptScannerProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState<'upload' | 'scanning' | 'review'>('upload');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<ReceiptData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<ReceiptData>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const startScanning = async () => {
    if (!selectedImage) return;
    
    setStep('scanning');
    try {
      const data = await mockOCRScan(selectedImage);
      setScannedData(data);
      setEditedData(data);
      setStep('review');
    } catch (error) {
      console.error('OCR scanning failed:', error);
      // Handle error - could show error message
    }
  };

  const handleSubmitExpense = () => {
    if (!scannedData) return;

    const finalData = isEditing ? { ...scannedData, ...editedData } : scannedData;
    
    const expenseData = {
      description: `${finalData.merchant} - Receipt`,
      amount: finalData.amount,
      category: finalData.category,
      date: finalData.date,
      isRecurring: false,
      tags: ['receipt', 'scanned'],
      receiptData: {
        merchant: finalData.merchant,
        items: finalData.items,
        taxAmount: finalData.taxAmount,
        paymentMethod: finalData.paymentMethod,
        confidence: finalData.confidence
      }
    };

    onSubmit(expenseData);
    handleClose();
  };

  const handleClose = () => {
    setStep('upload');
    setSelectedImage(null);
    setImagePreview(null);
    setScannedData(null);
    setIsEditing(false);
    setEditedData({});
    onClose();
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-success-600';
    if (confidence >= 0.7) return 'text-warning-600';
    return 'text-error-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return 'High Confidence';
    if (confidence >= 0.7) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const renderUploadStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <Scan className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Scan Your Receipt</h3>
        <p className="text-gray-600">
          Take a photo or upload an image of your receipt to automatically extract expense details
        </p>
      </div>

      {imagePreview && (
        <div className="relative">
          <img
            src={imagePreview}
            alt="Receipt preview"
            className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
          />
          <button
            onClick={() => {
              setSelectedImage(null);
              setImagePreview(null);
            }}
            className="absolute top-2 right-2 p-1 bg-error-600 text-white rounded-full hover:bg-error-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="h-24 flex-col space-y-2"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera className="w-8 h-8" />
          <span>Take Photo</span>
        </Button>

        <Button
          variant="outline"
          className="h-24 flex-col space-y-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-8 h-8" />
          <span>Upload Image</span>
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
      />

      {selectedImage && (
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={startScanning} className="flex-1">
            <Scan className="w-4 h-4 mr-2" />
            Scan Receipt
          </Button>
        </div>
      )}
    </div>
  );

  const renderScanningStep = () => (
    <div className="text-center py-12">
      <div className="relative">
        <Loader className="w-16 h-16 text-primary-600 mx-auto animate-spin mb-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FileText className="w-8 h-8 text-primary-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Scanning Receipt...</h3>
      <p className="text-gray-600">
        Our AI is analyzing your receipt and extracting the expense details
      </p>
      <div className="mt-6 bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
          <span>Processing image...</span>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => {
    if (!scannedData) return null;

    const currentData = isEditing ? { ...scannedData, ...editedData } : scannedData;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Review Scanned Data</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-sm font-medium ${getConfidenceColor(scannedData.confidence)}`}>
                {getConfidenceLabel(scannedData.confidence)}
              </span>
              <span className="text-sm text-gray-500">
                ({Math.round(scannedData.confidence * 100)}% accuracy)
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Done Editing' : 'Edit Details'}
          </Button>
        </div>

        {scannedData.confidence < 0.8 && (
          <div className="flex items-start space-x-3 p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning-800">Low Confidence Detection</p>
              <p className="text-sm text-warning-700">
                Please review and correct the extracted information before saving.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {isEditing ? (
              <Input
                label="Merchant"
                value={editedData.merchant || currentData.merchant}
                onChange={(value) => setEditedData({ ...editedData, merchant: value })}
              />
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Merchant</p>
                <p className="text-lg font-semibold text-gray-900">{currentData.merchant}</p>
              </div>
            )}

            {isEditing ? (
              <Input
                label="Amount (ZAR)"
                type="number"
                value={editedData.amount?.toString() || currentData.amount.toString()}
                onChange={(value) => setEditedData({ ...editedData, amount: parseFloat(value) })}
              />
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  R{currentData.amount.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <Input
                label="Date"
                type="date"
                value={editedData.date || currentData.date}
                onChange={(value) => setEditedData({ ...editedData, date: value })}
              />
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(currentData.date).toLocaleDateString()}
                </p>
              </div>
            )}

            {isEditing ? (
              <Select
                label="Category"
                value={editedData.category || currentData.category}
                onChange={(value) => setEditedData({ ...editedData, category: value })}
                options={categoryOptions}
              />
            ) : (
              <div>
                <p className="text-sm font-medium text-gray-700">Category</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {categoryOptions.find(cat => cat.value === currentData.category)?.label}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Receipt Items */}
        <Card>
          <h4 className="font-semibold text-gray-900 mb-4">Receipt Items</h4>
          <div className="space-y-3">
            {currentData.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">R{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {currentData.taxAmount && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>R{(currentData.amount - currentData.taxAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (VAT):</span>
                <span>R{currentData.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>R{currentData.amount.toFixed(2)}</span>
              </div>
            </div>
          )}

          {currentData.paymentMethod && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{currentData.paymentMethod}</span>
              </div>
            </div>
          )}
        </Card>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitExpense} className="flex-1">
            <Check className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Receipt Scanner"
      size="lg"
    >
      {step === 'upload' && renderUploadStep()}
      {step === 'scanning' && renderScanningStep()}
      {step === 'review' && renderReviewStep()}
    </Modal>
  );
};