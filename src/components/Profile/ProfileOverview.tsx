import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Shield, 
  Bell, 
  Eye, 
  EyeOff, 
  Edit, 
  Camera,
  Calendar,
  CreditCard,
  Settings,
  Lock,
  Smartphone,
  Globe,
  Download,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Crown,
  Star
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { mockUserProfile } from '../../utils/mockData';
import { UserProfile } from '../../types';

interface ProfileOverviewProps {
  profile?: UserProfile;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  profile = mockUserProfile
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'financial' | 'security' | 'preferences' | 'subscription'>('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'financial', label: 'Financial Profile', icon: Briefcase },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'subscription', label: 'Subscription', icon: Crown }
  ];

  const getSubscriptionBadge = (plan: string) => {
    const badges = {
      free: { color: 'bg-gray-100 text-gray-700', label: 'Free' },
      premium: { color: 'bg-primary-100 text-primary-700', label: 'Premium' },
      pro: { color: 'bg-secondary-100 text-secondary-700', label: 'Pro' }
    };
    return badges[plan as keyof typeof badges] || badges.free;
  };

  const getRiskToleranceColor = (risk: string) => {
    const colors = {
      conservative: 'bg-success-100 text-success-700',
      moderate: 'bg-warning-100 text-warning-700',
      aggressive: 'bg-error-100 text-error-700'
    };
    return colors[risk as keyof typeof colors] || colors.moderate;
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              {profile.profilePicture ? (
                <img 
                  src={profile.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <span className={`px-3 py-1 text-sm rounded-full ${getSubscriptionBadge(profile.subscription.plan).color}`}>
                {getSubscriptionBadge(profile.subscription.plan).label}
              </span>
            </div>
            <p className="text-gray-600 mb-1">{profile.employment.position} at {profile.employment.company}</p>
            <p className="text-sm text-gray-500">Member since {formatDate(profile.createdAt)}</p>
          </div>
          <Button
            variant={isEditing ? 'secondary' : 'outline'}
            icon={<Edit className="w-4 h-4" />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </Card>

      {/* Contact Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(profile.dateOfBirth)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">ID Number</p>
                <p className="font-medium">
                  {showSensitiveInfo ? profile.idNumber : '••••••••••••'}
                  <button
                    onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
                    className="ml-2 text-primary-600 hover:text-primary-700"
                  >
                    {showSensitiveInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Address Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-gray-400 mt-1" />
          <div>
            <p className="font-medium">{profile.address.street}</p>
            <p className="text-gray-600">
              {profile.address.city}, {profile.address.province} {profile.address.postalCode}
            </p>
            <p className="text-gray-600">{profile.address.country}</p>
          </div>
        </div>
      </Card>

      {/* Employment Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Employment Status</p>
              <p className="font-medium capitalize">{profile.employment.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-medium">{profile.employment.company}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-medium">{profile.employment.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-medium">{profile.employment.industry}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderFinancialProfile = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Risk Tolerance</p>
              <span className={`inline-block px-3 py-1 text-sm rounded-full ${getRiskToleranceColor(profile.financialProfile.riskTolerance)}`}>
                {profile.financialProfile.riskTolerance}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Investment Experience</p>
              <p className="font-medium capitalize">{profile.financialProfile.investmentExperience}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Time Horizon</p>
              <p className="font-medium capitalize">{profile.financialProfile.timeHorizon}-term</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="font-medium">{formatCurrency(profile.employment.monthlyIncome || 0)}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Goals</h3>
        <div className="flex flex-wrap gap-2">
          {profile.financialProfile.financialGoals.map((goal, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              {goal}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-success-600" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {profile.security.twoFactorEnabled ? (
                <CheckCircle className="w-5 h-5 text-success-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-warning-600" />
              )}
              <span className={`text-sm font-medium ${
                profile.security.twoFactorEnabled ? 'text-success-600' : 'text-warning-600'
              }`}>
                {profile.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-500">
                  Last changed {formatDate(profile.security.lastPasswordChange)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Login Activity</h3>
        <div className="space-y-3">
          {profile.security.loginHistory.map((login, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium text-sm">{login.device}</p>
                  <p className="text-xs text-gray-500">{login.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatDate(login.date)}</p>
                <p className="text-xs text-gray-500">{login.ip}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(profile.preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-4 h-4 text-gray-400" />
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                value ? 'bg-primary-600' : 'bg-gray-300'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Currency</p>
              <Select
                value={profile.preferences.currency}
                onChange={() => {}}
                options={[
                  { value: 'ZAR', label: 'South African Rand (ZAR)' },
                  { value: 'USD', label: 'US Dollar (USD)' },
                  { value: 'EUR', label: 'Euro (EUR)' }
                ]}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Language</p>
              <Select
                value={profile.preferences.language}
                onChange={() => {}}
                options={[
                  { value: 'English', label: 'English' },
                  { value: 'Afrikaans', label: 'Afrikaans' },
                  { value: 'Zulu', label: 'isiZulu' }
                ]}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Timezone</p>
              <Select
                value={profile.preferences.timezone}
                onChange={() => {}}
                options={[
                  { value: 'Africa/Johannesburg', label: 'South Africa (SAST)' },
                  { value: 'UTC', label: 'UTC' }
                ]}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          {Object.entries(profile.preferences.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                value ? 'bg-primary-600' : 'bg-gray-300'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSubscription = () => (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getSubscriptionBadge(profile.subscription.plan).color}`}>
            {getSubscriptionBadge(profile.subscription.plan).label}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div className="flex items-center space-x-2 mt-1">
              <CheckCircle className="w-4 h-4 text-success-600" />
              <span className="font-medium capitalize text-success-600">{profile.subscription.status}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Billing</p>
            <p className="font-medium mt-1">{formatDate(profile.subscription.nextBilling || '')}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Plan Features</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {profile.subscription.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-primary-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="primary">
            Upgrade Plan
          </Button>
          <Button variant="outline">
            Manage Billing
          </Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            icon={<Download className="w-4 h-4" />}
          >
            Export Account Data
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-error-600 hover:text-error-700 hover:bg-error-50"
            icon={<Trash2 className="w-4 h-4" />}
          >
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'financial':
        return renderFinancialProfile();
      case 'security':
        return renderSecurity();
      case 'preferences':
        return renderPreferences();
      case 'subscription':
        return renderSubscription();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <Card padding="sm">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Content */}
      {renderContent()}
    </div>
  );
};