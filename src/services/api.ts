// API Configuration and Service Layer
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sentinel.ai/v1';

// API Keys for different services (stored in environment variables for security)
export const API_KEYS = {
  // Sentinel AI services
  DASHBOARD: process.env.NEXT_PUBLIC_DASHBOARD_KEY || 'sentinel_dash_live_sk_1a2b3c4d5e6f7g8h9i0j',
  THREAT_DETECTION: process.env.NEXT_PUBLIC_THREAT_KEY || 'sentinel_threat_live_sk_9z8y7x6w5v4u3t2s1r0q',
  NETWORK_MONITOR: process.env.NEXT_PUBLIC_NETWORK_KEY || 'sentinel_network_live_sk_5m4n3b2v1c0x9z8a7s6d',
  INCIDENT_RESPONSE: process.env.NEXT_PUBLIC_INCIDENT_KEY || 'sentinel_incident_live_sk_3q2w1e4r5t6y7u8i9o0p',
  REPORTS: process.env.NEXT_PUBLIC_REPORTS_KEY || 'sentinel_reports_live_sk_7h6g5f4d3s2a1z9x8c7v',
  CHATBOT: process.env.NEXT_PUBLIC_CHATBOT_KEY || 'sentinel_chatbot_live_sk_2k3j4h5g6f7d8s9a0q1w',

  // Free threat detection API keys (for student projects)
  VIRUSTOTAL: process.env.NEXT_PUBLIC_VIRUSTOTAL_API_KEY || '', // Key from VirusTotal Community
  SAFE_BROWSING: process.env.NEXT_PUBLIC_SAFE_BROWSING_API_KEY || '', // Key from Google Safe Browsing API
  ABUSEIPDB: process.env.NEXT_PUBLIC_ABUSEIPDB_API_KEY || '',      // Key from AbuseIPDB
};

// Common headers helper
const getHeaders = (apiKey: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,    // Attach API key for authentication
  'X-API-Version': '2024-01-15',
  'X-Client-ID': 'sentinel-ai-webapp'
});

// -------- Defendax Internal Services --------

// Dashboard API Service
export class DashboardAPI {
  private static apiKey = API_KEYS.DASHBOARD;

  /**
   * Fetch overall dashboard stats
   */
  static async getOverviewStats() {
    const res = await fetch(`${API_BASE_URL}/dashboard/overview`, {
      method: 'GET', headers: getHeaders(this.apiKey)
    });
    if (!res.ok) throw new Error(`Dashboard API Error: ${res.status}`);
    return res.json();
  }

  /**
   * Fetch security feed
   */
  static async getSecurityFeed() {
    const res = await fetch(`${API_BASE_URL}/dashboard/security-feed`, {
      method: 'GET', headers: getHeaders(this.apiKey)
    });
    if (!res.ok) throw new Error(`Dashboard API Error: ${res.status}`);
    return res.json();
  }

  /**
   * Fetch network overview
   */
  static async getNetworkOverview() {
    const res = await fetch(`${API_BASE_URL}/dashboard/network-overview`, {
      method: 'GET', headers: getHeaders(this.apiKey)
    });
    if (!res.ok) throw new Error(`Dashboard API Error: ${res.status}`);
    return res.json();
  }

  // Other dashboard methods omitted for brevity...
}

// Threat Detection API Service (Defendax)
export class ThreatDetectionAPI {
  private static apiKey = API_KEYS.THREAT_DETECTION;

  /**
   * List active threats detected by Defendax
   */
  static async getActiveThreats() {
    const res = await fetch(`${API_BASE_URL}/threats/active`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Get threat statistics
   */
  static async getThreatStats() {
    const res = await fetch(`${API_BASE_URL}/threats/stats`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Quarantine a threat by ID
   */
  static async quarantineThreat(threatId: string) {
    const res = await fetch(`${API_BASE_URL}/threats/${threatId}/quarantine`, { method: 'POST', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Run a full system scan
   */
  static async runFullScan() {
    const res = await fetch(`${API_BASE_URL}/threats/scan`, { method: 'POST', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  // Other Defendax threat methods omitted for brevity...
}

// Network Monitor API Service
export class NetworkMonitorAPI {
  private static apiKey = API_KEYS.NETWORK_MONITOR;

  /**
   * Get network status
   */
  static async getNetworkStatus() {
    const res = await fetch(`${API_BASE_URL}/network/status`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Get network traffic data
   */
  static async getTrafficData() {
    const res = await fetch(`${API_BASE_URL}/network/traffic`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Get network device list
   */
  static async getDeviceList() {
    const res = await fetch(`${API_BASE_URL}/network/devices`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Block an IP address
   */
  static async blockIP(ipAddress: string) {
    const res = await fetch(`${API_BASE_URL}/network/block-ip`, {
      method: 'POST',
      headers: getHeaders(this.apiKey),
      body: JSON.stringify({ ip: ipAddress })
    });
    return res.json();
  }
}

// Incident Response API Service
export class IncidentResponseAPI {
  private static apiKey = API_KEYS.INCIDENT_RESPONSE;

  /**
   * Get active incidents
   */
  static async getActiveIncidents() {
    const res = await fetch(`${API_BASE_URL}/incidents/active`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Create new incident
   */
  static async createIncident(incidentData: any) {
    const res = await fetch(`${API_BASE_URL}/incidents`, { 
      method: 'POST', 
      headers: getHeaders(this.apiKey),
      body: JSON.stringify(incidentData)
    });
    return res.json();
  }

  /**
   * Get all incidents
   */
  static async getIncidents() {
    const res = await fetch(`${API_BASE_URL}/incidents`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Resolve an incident
   */
  static async resolveIncident(incidentId: string) {
    const res = await fetch(`${API_BASE_URL}/incidents/${incidentId}/resolve`, { method: 'POST', headers: getHeaders(this.apiKey) });
    return res.json();
  }
}

// Reports API Service
export class ReportsAPI {
  private static apiKey = API_KEYS.REPORTS;

  /**
   * Get security reports
   */
  static async getSecurityReports() {
    const res = await fetch(`${API_BASE_URL}/reports/security`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Generate new report
   */
  static async generateReport(reportType: string, dateRange: any) {
    const res = await fetch(`${API_BASE_URL}/reports/generate`, { 
      method: 'POST', 
      headers: getHeaders(this.apiKey),
      body: JSON.stringify({ type: reportType, dateRange })
    });
    return res.json();
  }

  /**
   * Get report history
   */
  static async getReportHistory() {
    const res = await fetch(`${API_BASE_URL}/reports/history`, { method: 'GET', headers: getHeaders(this.apiKey) });
    return res.json();
  }

  /**
   * Download a report by ID
   */
  static async downloadReport(reportId: string) {
    const res = await fetch(`${API_BASE_URL}/reports/download/${reportId}`, { method: 'GET', headers: getHeaders(this.apiKey) });
    if (!res.ok) throw new Error(`Failed to download report: ${res.status}`);
    return res.blob();
  }
}

// -------- Free Threat Detection Services --------

// VirusTotal API Service
// Added: allows scanning URLs/hashes and retrieving multi-engine malware reports
export class VirusTotalService {
  private static apiKey = API_KEYS.VIRUSTOTAL;
  private static baseURL = 'https://www.virustotal.com/api/v3';

  /**
   * Lookup file or URL by its hash or ID
   */
  static async lookupResource(resourceId: string) {
    const res = await fetch(`${this.baseURL}/${resourceId}`, {
      headers: { 'x-apikey': this.apiKey }
    });
    return res.json();
  }

  /**
   * Submit a URL for scanning
   */
  static async scanURL(url: string) {
    const res = await fetch(`${this.baseURL}/urls`, {
      method: 'POST', headers: { 'x-apikey': this.apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    return res.json();
  }
}

// Google Safe Browsing API Service
// Added: checks URLs against Google’s phishing/malware lists
export class SafeBrowsingService {
  private static apiKey = API_KEYS.SAFE_BROWSING;
  private static url = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

  /**
   * Check a URL for threats
   */
  static async checkURL(urlToCheck: string) {
    const body = {
      client: { clientId: 'defendax-webapp', clientVersion: '1.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url: urlToCheck }]
      }
    };
    const res = await fetch(`${this.url}?key=${this.apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.json();
  }
}

// AbuseIPDB API Service
// Added: retrieves reputation score for IP addresses
export class AbuseIPDBService {
  private static apiKey = API_KEYS.ABUSEIPDB;
  private static baseURL = 'https://api.abuseipdb.com/api/v2';

  /**
   * Check reputation of an IP address
   */
  static async checkIP(ip: string) {
    const res = await fetch(`${this.baseURL}/check?ipAddress=${ip}&confidenceMinimum=50`, {
      headers: { 'Key': this.apiKey, 'Accept': 'application/json' }
    });
    return res.json();
  }
}

// (Additional free services like PhishTank, GreyNoise, etc. can be added similarly)

// Error handling utility
export const handleAPIError = (error: any) => {
  if (error.response) {
    console.error('API Error Response:', error.response.data);
    return error.response.data.message || 'Server error occurred';
  } else if (error.request) {
    console.error('API Network Error:', error.request);
    return 'Network error - please check your connection';
  } else {
    console.error('API Error:', error.message);
    return error.message || 'An unexpected error occurred';
  }
};

// Chatbot API Service
export class ChatbotAPI {
  private static apiKey = API_KEYS.CHATBOT;

  /**
   * Send a message to the Sentinel AI Chatbot and get response
   */
  static async sendMessage(message: string) {
    const res = await fetch(`${API_BASE_URL}/chatbot/message`, {
      method: 'POST',
      headers: getHeaders(this.apiKey),
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error(`Chatbot API Error: ${res.status}`);
    return res.json();
  }
}

// AI Integration Service
export class SentinelAIService {
  private static apiKey = API_KEYS.CHATBOT;

  /**
   * Analyze threat with AI
   */
  static async analyzeThreat(threatData: any) {
    const res = await fetch(`${API_BASE_URL}/ai/threat-analysis`, {
      method: 'POST',
      headers: getHeaders(this.apiKey),
      body: JSON.stringify(threatData)
    });

    if (!res.ok) throw new Error(`AI Analysis Error: ${res.status}`);
    return res.json();
  }

  /**
   * Detect network anomalies with AI
   */
  static async detectNetworkAnomalies(networkData: any) {
    const res = await fetch(`${API_BASE_URL}/ai/network-analysis`, {
      method: 'POST',
      headers: getHeaders(this.apiKey),
      body: JSON.stringify(networkData)
    });

    if (!res.ok) throw new Error(`AI Network Analysis Error: ${res.status}`);
    return res.json();
  }

  /**
   * Generate AI-powered incident response
   */
  static async generateIncidentResponse(incidentData: any) {
    const res = await fetch(`${API_BASE_URL}/ai/incident-response`, {
      method: 'POST',
      headers: getHeaders(this.apiKey),
      body: JSON.stringify(incidentData)
    });

    if (!res.ok) throw new Error(`AI Incident Response Error: ${res.status}`);
    return res.json();
  }

  /**
   * Generate AI-powered report
   */
  static async generateAIReport(reportType: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/ai/report-generation`, {
      method: 'POST',
      headers: getHeaders(this.apiKey),
      body: JSON.stringify({ reportType, data })
    });

    if (!res.ok) throw new Error(`AI Report Generation Error: ${res.status}`);
    return res.json();
  }
}
