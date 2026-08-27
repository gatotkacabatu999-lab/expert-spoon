import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

const navItems = [
  'Overview',
  'Projects',
  'Tasks',
  'Calendar',
  'Messages',
  'Analytics',
]

const statCards = [
  { label: 'Total revenue', value: '$128.4K', delta: '+12.8%', accent: 'violet' },
  { label: 'Active users', value: '8,432', delta: '+9.1%', accent: 'blue' },
  { label: 'Tasks done', value: '284', delta: '+18.3%', accent: 'green' },
  { label: 'New leads', value: '96', delta: '+4.6%', accent: 'amber' },
]

const taskList = [
  { title: 'UX review for landing page', meta: 'Design • 3 tasks', done: false },
  { title: 'Sprint planning checklist', meta: 'Product • Due today', done: true },
  { title: 'Client onboarding flow', meta: 'Engineering • 2 blockers', done: false },
]

const meetings = [
  { time: '08:30', title: 'Daily standup', type: 'Team' },
  { time: '10:00', title: 'Brand workshop', type: 'Marketing' },
  { time: '15:45', title: 'Sync with clients', type: 'Sales' },
]

const activity = [
  'New design assets uploaded',
  'Quarterly forecast published',
  'Marketing campaign approved',
]

function App() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeNav, setActiveNav] = useState('Overview')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [settingsTab, setSettingsTab] = useState('Appearance')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSignUp) {
      if (!fullName || !email || !password || !confirmPassword) {
        setMessage('Please complete all sign up fields.')
        return
      }

      if (password !== confirmPassword) {
        setMessage('Passwords do not match. Please try again.')
        return
      }
    } else if (!email || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    setMessage('')
    setIsLoggedIn(true)
    setActiveNav('Overview')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setMessage('')
    setFullName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setRemember(false)
  }

  if (isLoggedIn) {
    return (
      <div className={`app-root ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <div className={`settings-overlay ${isSettingsOpen ? 'open' : ''}`} onClick={() => setIsSettingsOpen(false)} />

        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          <div className="sidebar-brand">
            <div className="brand-mark">M</div>
            <div>
              <p className="eyebrow">Workspace</p>
              <h3>Overview</h3>
            </div>
          </div>

          <div className="sidebar-search" aria-label="Search">
            <span className="search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search workspace"
            />
          </div>

          <nav className="sidebar-nav" aria-label="Sidebar navigation">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                className={activeNav === item ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveNav(item)}
              >
                <span className="nav-item-dot" aria-hidden="true" />
                {item}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-summary">
              <div className="avatar">JD</div>
              <div>
                <strong>John Doe</strong>
                <small>Product lead</small>
              </div>
            </div>

            <button type="button" className="secondary-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="topbar sticky-nav">
            <div className="topbar-start">
              <button
                type="button"
                className="icon-btn toggle-btn"
                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                onClick={() => setIsSidebarOpen((current) => !current)}
              >
                ☰
              </button>
            </div>

            <div className="topbar-actions">
              <button
                type="button"
                className="icon-btn settings-btn"
                aria-label="Settings"
                onClick={() => setIsSettingsOpen(true)}
              >
                ⚙
              </button>
            </div>
          </header>

          <section className="page-heading-wrap">
            <h1 className="page-heading">Overview</h1>
          </section>

          <section className="stats-grid">
            {statCards.map((card) => (
              <article key={card.label} className={`stat-card ${card.accent}`}>
                <div className="stat-header">
                  <span>{card.label}</span>
                  <span className="delta">{card.delta}</span>
                </div>
                <strong>{card.value}</strong>
              </article>
            ))}
          </section>

          <section className="content-grid">
            <div className="panel panel-large">
              <div className="panel-header">
                <h2>Performance</h2>
                <button type="button" className="text-link muted">
                  View report
                </button>
              </div>

              <div className="chart-bars" aria-label="Performance chart">
                <span style={{ height: '46%' }} />
                <span style={{ height: '58%' }} />
                <span style={{ height: '52%' }} />
                <span style={{ height: '68%' }} />
                <span style={{ height: '72%' }} />
                <span style={{ height: '88%' }} />
                <span style={{ height: '80%' }} />
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Priority tasks</h2>
                <button type="button" className="text-link muted">
                  See all
                </button>
              </div>

              <ul className="task-list">
                {taskList.map((task) => (
                  <li key={task.title} className={task.done ? 'done' : ''}>
                    <span className="checkmark" aria-hidden="true">
                      {task.done ? '✓' : ''}
                    </span>
                    <div>
                      <strong>{task.title}</strong>
                      <small>{task.meta}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <h2>Today&apos;s schedule</h2>
                <button type="button" className="text-link muted">
                  Add event
                </button>
              </div>

              <div className="meeting-list">
                {meetings.map((meeting) => (
                  <div key={meeting.title} className="meeting-item">
                    <span className="meeting-time">{meeting.time}</span>
                    <div>
                      <strong>{meeting.title}</strong>
                      <small>{meeting.type}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h2>Recent activity</h2>
              </div>

              <ul className="activity-list">
                {activity.map((item) => (
                  <li key={item}>
                    <span className="activity-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>

        <aside className={`settings-panel ${isSettingsOpen ? 'open' : ''}`} aria-label="Settings panel">
          <div className="settings-header">
            <div className="settings-brand">
              <span className="settings-brand-mark">M</span>
              <div>
                <p className="eyebrow">Workspace</p>
                <h2>Settings</h2>
              </div>
            </div>
            <button type="button" className="close-btn" onClick={() => setIsSettingsOpen(false)} aria-label="Close settings">
              ✕
            </button>
          </div>

          <div className="settings-body">
            <nav className="settings-sidebar" aria-label="Settings navigation">
              {['Appearance', 'Workspace', 'Security'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={settingsTab === tab ? 'settings-nav-item active' : 'settings-nav-item'}
                  onClick={() => setSettingsTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="settings-content">
              <div className="settings-card settings-card-large">
                <div className="settings-card-header">
                  <span className="settings-card-title">{settingsTab}</span>
                </div>

                {settingsTab === 'Appearance' && (
                  <>
                    <div className="theme-switcher">
                      <button
                        type="button"
                        className={theme === 'light' ? 'theme-option active' : 'theme-option'}
                        onClick={() => setTheme('light')}
                      >
                        <span>☀</span>
                        Light
                      </button>
                      <button
                        type="button"
                        className={theme === 'dark' ? 'theme-option active' : 'theme-option'}
                        onClick={() => setTheme('dark')}
                      >
                        <span>☾</span>
                        Dark
                      </button>
                    </div>

                    <div className="settings-list compact">
                      <button type="button" className="settings-list-item">
                        <span>Density</span>
                        <span className="settings-hint">Comfortable</span>
                      </button>
                      <button type="button" className="settings-list-item">
                        <span>Accent</span>
                        <span className="settings-hint">Violet</span>
                      </button>
                    </div>
                  </>
                )}

                {settingsTab === 'Workspace' && (
                  <div className="settings-list compact">
                    <button type="button" className="settings-list-item">
                      <span>Notifications</span>
                      <span className="settings-hint">On</span>
                    </button>
                    <button type="button" className="settings-list-item">
                      <span>Layout</span>
                      <span className="settings-hint">Sidebar</span>
                    </button>
                    <button type="button" className="settings-list-item">
                      <span>Default page</span>
                      <span className="settings-hint">Overview</span>
                    </button>
                  </div>
                )}

                {settingsTab === 'Security' && (
                  <div className="settings-list compact">
                    <button type="button" className="settings-list-item">
                      <span>Password</span>
                      <span className="settings-hint">Changed 2w ago</span>
                    </button>
                    <button type="button" className="settings-list-item">
                      <span>Two-factor</span>
                      <span className="settings-hint">Enabled</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    )
  }

  return (
    <main className={`auth-shell ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <section className="auth-card" aria-label={isSignUp ? 'Sign up form' : 'Sign in form'}>
        <div className="brand-row">
          <div className="brand-mark">M</div>
          <div>
            <p className="eyebrow">Workspace</p>
            <h1>{isSignUp ? 'Create account' : 'Welcome back'}</h1>
          </div>
        </div>

        <p className="subtitle">
          {isSignUp
            ? 'Create your account to get started.'
            : 'Sign in to continue to your workspace.'}
        </p>

        <div className="auth-toggle" aria-label="Authentication mode switcher">
          <button
            type="button"
            className={isSignUp ? 'tab-button' : 'tab-button active'}
            onClick={() => setIsSignUp(false)}
          >
            Sign in
          </button>
          <button
            type="button"
            className={isSignUp ? 'tab-button active' : 'tab-button'}
            onClick={() => setIsSignUp(true)}
          >
            Sign up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <label>
              Full name
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="John Doe"
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={isSignUp ? 'Create a password' : '••••••••'}
              />
              <button
                type="button"
                className="password-toggle"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                onClick={() => setIsPasswordVisible((current) => !current)}
              >
                {isPasswordVisible ? '🙈' : '👁'}
              </button>
            </div>
          </label>

          {isSignUp && (
            <label>
              Confirm password
              <div className="password-field">
                <input
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={isConfirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'}
                  onClick={() => setIsConfirmPasswordVisible((current) => !current)}
                >
                  {isConfirmPasswordVisible ? '🙈' : '👁'}
                </button>
              </div>
            </label>
          )}

          {!isSignUp && (
            <div className="form-row">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember((current) => !current)}
                />
                <span>Remember me</span>
              </label>

              <a href="#" className="link-btn">
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className="primary-btn">
            {isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {!isSignUp && (
          <p className="switch-copy">
            Don&apos;t have an account?{' '}
            <button type="button" className="text-link" onClick={() => setIsSignUp(true)}>
              Sign up
            </button>
          </p>
        )}

        {isSignUp && (
          <p className="switch-copy">
            Already have an account?{' '}
            <button type="button" className="text-link" onClick={() => setIsSignUp(false)}>
              Sign in
            </button>
          </p>
        )}

        {message && <p className="status-message">{message}</p>}
      </section>
    </main>
  )
}

export default App
