import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Clock } from 'lucide-react';

export default function OrdersPage() {
  const location = useLocation();
  const orderConfirmed = location.state?.orderConfirmed;
  const orderNumber = location.state?.orderNumber;

  const mockOrders = [
    {
      id: '1',
      number: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.97,
      items: [
        { name: 'Wireless Bluetooth Headphones', quantity: 1, price: 79.99 },
        { name: 'Smartphone Case', quantity: 2, price: 24.99 },
      ],
    },
    {
      id: '2',
      number: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 159.98,
      items: [
        { name: 'Mechanical Keyboard', quantity: 1, price: 129.99 },
        { name: 'Wireless Mouse', quantity: 1, price: 39.99 },
      ],
    },
  ];

  if (orderConfirmed && orderNumber) {
    // Add the new order to the front of the list
    mockOrders.unshift({
      id: Date.now().toString(),
      number: orderNumber,
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      total: 0, // This would be calculated from the actual order
      items: [],
    });
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {orderConfirmed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  Order Confirmed!
                </h3>
                <p className="text-green-700">
                  Your order #{orderNumber} has been placed successfully.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {mockOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.number}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium text-gray-700">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {order.items.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    {order.status === 'processing' && 'Being prepared for shipment'}
                    {order.status === 'shipped' && 'Out for delivery'}
                    {order.status === 'delivered' && 'Successfully delivered'}
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}