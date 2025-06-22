import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  Video, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Send,
  Download,
  Headphones,
  Users,
  Shield,
  CreditCard,
  Settings,
  TrendingUp,
  Target,
  PiggyBank,
  Brain
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'article' | 'interactive';
  category: string;
  completed?: boolean;
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastUpdate: string;
}

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I connect my bank account to FinanceAI?',
    answer: 'To connect your bank account, go to the Accounts section and click "Add Account". You\'ll need to provide your bank details and verify your identity. We use bank-grade encryption to keep your information secure.',
    category: 'accounts',
    helpful: 45
  },
  {
    id: '2',
    question: 'Is my financial data secure with FinanceAI?',
    answer: 'Yes, we take security very seriously. We use 256-bit SSL encryption, two-factor authentication, and comply with South African financial regulations. Your data is never shared with third parties without your consent.',
    category: 'security',
    helpful: 67
  },
  {
    id: '3',
    question: 'How accurate is the AI-powered expense categorization?',
    answer: 'Our AI categorization is approximately 95% accurate. You can always manually adjust categories, and the AI learns from your corrections to improve future categorizations.',
    category: 'features',
    helpful: 32
  },
  {
    id: '4',
    question: 'Can I export my financial data?',
    answer: 'Yes, Premium and Pro users can export their data in CSV, PDF, or Excel formats. Go to Profile & Settings > Export Data to download your information.',
    category: 'data',
    helpful: 28
  },
  {
    id: '5',
    question: 'What\'s the difference between Free, Premium, and Pro plans?',
    answer: 'Free includes basic budgeting and expense tracking. Premium adds AI insights, investment tracking, and advanced analytics. Pro includes everything plus priority support, custom reports, and financial advisor consultations.',
    category: 'billing',
    helpful: 89
  },
  {
    id: '6',
    question: 'How do I set up budget alerts?',
    answer: 'Go to Budget & Planning, select a category, and click the alert icon. You can set alerts for when you reach 50%, 75%, or 90% of your budget limit.',
    category: 'budgeting',
    helpful: 41
  }
];

const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with FinanceAI',
    description: 'Learn the basics of setting up your account and connecting your first bank account',
    duration: '5 min',
    difficulty: 'beginner',
    type: 'video',
    category: 'getting-started',
    completed: true
  },
  {
    id: '2',
    title: 'Creating Your First Budget',
    description: 'Step-by-step guide to creating and managing budget categories',
    duration: '8 min',
    difficulty: 'beginner',
    type: 'interactive',
    category: 'budgeting'
  },
  {
    id: '3',
    title: 'Understanding AI Insights',
    description: 'How to interpret and act on AI-generated financial recommendations',
    duration: '12 min',
    difficulty: 'intermediate',
    type: 'video',
    category: 'ai-features'
  },
  {
    id: '4',
    title: 'Investment Portfolio Tracking',
    description: 'Learn to track and analyze your investment performance',
    duration: '15 min',
    difficulty: 'intermediate',
    type: 'article',
    category: 'investments'
  },
  {
    id: '5',
    title: 'Advanced Financial Goal Setting',
    description: 'Master the art of setting and achieving complex financial goals',
    duration: '20 min',
    difficulty: 'advanced',
    type: 'interactive',
    category: 'goals'
  }
];

const mockSupportTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Unable to sync FNB account',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2024-01-14',
    lastUpdate: '2024-01-15'
  },
  {
    id: 'TKT-002',
    subject: 'Question about Premium features',
    status: 'resolved',
    priority: 'low',
    createdAt: '2024-01-12',
    lastUpdate: '2024-01-13'
  }
];

export const HelpOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'tutorials' | 'contact' | 'tickets'>('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    category: '',
    priority: '',
    message: ''
  });

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'contact', label: 'Contact Support', icon: MessageCircle },
    { id: 'tickets', label: 'My Tickets', icon: FileText }
  ];

  const faqCategories = [
    { value: '', label: 'All Categories' },
    { value: 'accounts', label: 'Account Management' },
    { value: 'security', label: 'Security & Privacy' },
    { value: 'features', label: 'Features & Tools' },
    { value: 'budgeting', label: 'Budgeting' },
    { value: 'billing', label: 'Billing & Plans' },
    { value: 'data', label: 'Data & Export' }
  ];

  const contactCategories = [
    { value: 'technical', label: 'Technical Issue' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'account', label: 'Account Issue' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low - General question' },
    { value: 'medium', label: 'Medium - Account issue' },
    { value: 'high', label: 'High - Cannot access account' },
    { value: 'urgent', label: 'Urgent - Security concern' }
  ];

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success-100 text-success-700';
      case 'intermediate':
        return 'bg-warning-100 text-warning-700';
      case 'advanced':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'article':
        return <FileText className="w-4 h-4" />;
      case 'interactive':
        return <Settings className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-primary-100 text-primary-700';
      case 'in-progress':
        return 'bg-warning-100 text-warning-700';
      case 'resolved':
        return 'bg-success-100 text-success-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-700';
      case 'medium':
        return 'bg-primary-100 text-primary-700';
      case 'high':
        return 'bg-warning-100 text-warning-700';
      case 'urgent':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({
      subject: '',
      category: '',
      priority: '',
      message: ''
    });
  };

  const renderFAQSection = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={<Search className="w-4 h-4" />}
          />
          <Select
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={faqCategories}
            placeholder="Filter by category"
          />
        </div>
      </Card>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <Card key={faq.id} className="transition-all duration-200">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            >
              <h3 className="font-semibold text-gray-900 flex-1 pr-4">{faq.question}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{faq.helpful} helpful</span>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            
            {expandedFAQ === faq.id && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed mb-4">{faq.answer}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">
                    Category: {faq.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Was this helpful?</span>
                    <Button variant="ghost" size="sm">
                      👍
                    </Button>
                    <Button variant="ghost" size="sm">
                      👎
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or browse all categories.
            </p>
            <Button variant="primary" onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );

  const renderTutorialsSection = () => (
    <div className="space-y-6">
      {/* Tutorial Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Getting Started', count: 5, color: 'primary' },
          { icon: PiggyBank, label: 'Budgeting', count: 8, color: 'success' },
          { icon: TrendingUp, label: 'Investments', count: 6, color: 'secondary' },
          { icon: Brain, label: 'AI Features', count: 4, color: 'warning' }
        ].map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} hover className="text-center">
              <div className={`w-12 h-12 rounded-full bg-${category.color}-100 flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 text-${category.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.label}</h3>
              <p className="text-sm text-gray-500">{category.count} tutorials</p>
            </Card>
          );
        })}
      </div>

      {/* Tutorial List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTutorials.map((tutorial) => (
          <Card key={tutorial.id} hover className="h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(tutorial.type)}
                <span className="text-sm text-gray-500 capitalize">{tutorial.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
                {tutorial.completed && (
                  <CheckCircle className="w-4 h-4 text-success-600" />
                )}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tutorial.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {tutorial.duration}
              </div>
              <Button 
                variant={tutorial.completed ? 'secondary' : 'primary'} 
                size="sm"
                icon={tutorial.completed ? <CheckCircle className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              >
                {tutorial.completed ? 'Review' : 'Start'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="text-center">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
          <p className="text-xs text-gray-500 mb-4">Available 24/7</p>
          <Button variant="primary" size="sm" className="w-full">
            Start Chat
          </Button>
        </Card>

        <Card hover className="text-center">
          <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-success-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
          <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
          <p className="text-xs text-gray-500 mb-4">Response within 24 hours</p>
          <Button variant="outline" size="sm" className="w-full">
            Send Email
          </Button>
        </Card>

        <Card hover className="text-center">
          <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-secondary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
          <p className="text-gray-600 text-sm mb-4">Speak directly with our team</p>
          <p className="text-xs text-gray-500 mb-4">Mon-Fri, 8AM-6PM SAST</p>
          <Button variant="outline" size="sm" className="w-full">
            Call Now
          </Button>
        </Card>
      </div>

      {/* Contact Form */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Submit a Support Request</h3>
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Subject"
              placeholder="Brief description of your issue"
              value={contactForm.subject}
              onChange={(value) => setContactForm({ ...contactForm, subject: value })}
              required
            />
            <Select
              label="Category"
              value={contactForm.category}
              onChange={(value) => setContactForm({ ...contactForm, category: value })}
              options={contactCategories}
              placeholder="Select category"
              required
            />
          </div>

          <Select
            label="Priority"
            value={contactForm.priority}
            onChange={(value) => setContactForm({ ...contactForm, priority: value })}
            options={priorityOptions}
            placeholder="Select priority level"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Message <span className="text-error-500">*</span>
            </label>
            <textarea
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              placeholder="Please provide detailed information about your issue..."
              rows={6}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button type="submit" variant="primary" icon={<Send className="w-4 h-4" />}>
              Submit Request
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setContactForm({ subject: '', category: '', priority: '', message: '' })}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );

  const renderTicketsSection = () => (
    <div className="space-y-6">
      {/* Tickets Header */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
            <p className="text-gray-600">Track and manage your support requests</p>
          </div>
          <Button variant="primary" icon={<MessageCircle className="w-4 h-4" />}>
            New Ticket
          </Button>
        </div>
      </Card>

      {/* Tickets List */}
      {mockSupportTickets.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Support Tickets</h3>
            <p className="text-gray-600 mb-4">
              You haven't submitted any support requests yet.
            </p>
            <Button variant="primary" icon={<MessageCircle className="w-4 h-4" />}>
              Create Your First Ticket
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {mockSupportTickets.map((ticket) => (
            <Card key={ticket.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{ticket.subject}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Ticket #{ticket.id}</span>
                    <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    <span>Last update: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'faq':
        return renderFAQSection();
      case 'tutorials':
        return renderTutorialsSection();
      case 'contact':
        return renderContactSection();
      case 'tickets':
        return renderTicketsSection();
      default:
        return renderFAQSection();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/20 rounded-full">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <p className="text-primary-100">
              Find answers, learn new features, and get the help you need
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Search, label: 'Search FAQs', description: 'Find quick answers' },
          { icon: Video, label: 'Watch Tutorials', description: 'Learn step by step' },
          { icon: MessageCircle, label: 'Live Chat', description: 'Get instant help' },
          { icon: Download, label: 'User Guide', description: 'Download PDF guide' }
        ].map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} hover className="text-center cursor-pointer">
              <Icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900 mb-1">{action.label}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </Card>
          );
        })}
      </div>

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

      {/* Additional Resources */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Users className="w-5 h-5 text-primary-600" />
            <div>
              <p className="font-medium text-gray-900">Community Forum</p>
              <p className="text-sm text-gray-500">Connect with other users</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-success-600" />
            <div>
              <p className="font-medium text-gray-900">Security Center</p>
              <p className="text-sm text-gray-500">Learn about data protection</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Star className="w-5 h-5 text-warning-600" />
            <div>
              <p className="font-medium text-gray-900">Feature Requests</p>
              <p className="text-sm text-gray-500">Suggest improvements</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};