import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';

// Harvard Resume Format - balanced spacing for 1 page
const styles = StyleSheet.create({
  page: {
    paddingTop: 22,
    paddingBottom: 18,
    paddingHorizontal: 42,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.16,
    color: '#000',
  },
  // Header
  header: {
    textAlign: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 17,
    fontFamily: 'Times-Bold',
    letterSpacing: 0.5,
    marginBottom: 9,
  },
  contactLine: {
    fontSize: 10,
    marginBottom: 0,
  },
  link: {
    color: '#000',
    textDecoration: 'underline',
  },
  // Divider line
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 8,
    marginBottom: 6,
  },
  // Summary/Bio
  summary: {
    fontSize: 10,
    lineHeight: 1.35,
    textAlign: 'justify',
    marginBottom: 4,
  },
  // Section
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
    marginTop: 6,
  },
  sectionDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    marginBottom: 4,
  },
  // Entry rows
  entryContainer: {
    marginBottom: 5,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  entryLeft: {
    flex: 1,
  },
  entryRight: {
    textAlign: 'right',
    minWidth: 95,
  },
  entryTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
  },
  entrySubtitle: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
  },
  entryDetail: {
    fontSize: 10,
  },
  // Bullets
  bulletList: {
    marginTop: 2,
    marginLeft: 0,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 1,
    paddingLeft: 6,
  },
  bullet: {
    width: 8,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.2,
  },
  // Links row (under experience bullets)
  linksRow: {
    fontSize: 9,
    marginTop: 1,
    paddingLeft: 14,
    color: '#000',
  },
  // Publication row (under project bullets)
  pubRow: {
    fontSize: 8.5,
    marginTop: 1,
    paddingLeft: 14,
    color: '#000',
    fontStyle: 'italic',
  },
  // Skills
  skillsContainer: {
    marginTop: 2,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 1,
    flexWrap: 'wrap',
  },
  skillLabel: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
  },
  skillText: {
    fontSize: 10,
  },
});

export interface ResumeData {
  name: string;
  email: string;
  workEmail: string;
  location: string;
  portfolioUrl?: string;
  linkedinUrl: string;
  githubUrl: string;
  googleScholarUrl: string;
  summary: string;
  education: Array<{
    institution: string;
    degree: string;
    field?: string;
    period: string;
    location: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
    tools?: string;
    links?: Array<{ label: string; href: string }>;
  }>;
  projects: Array<{
    title: string;
    period: string;
    bullets: string[];
    publication?: string;
    publicationVenue?: string;
    publicationLink?: string;
  }>;
  skills: {
    programming: string[];
    ml: string[];
    hpc: string[];
    simulation: string[];
    physicsAiStack?: string[];
  };
  talksAndPress?: Array<{ kind: 'talk' | 'press'; text: string; href?: string }>;
  leadership?: string[];
}

function ResumeDocument({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name.toUpperCase()}</Text>
          <Text style={styles.contactLine}>
            {data.location} | {data.email}
            {data.portfolioUrl ? (
              <>
                {' | '}
                <Link src={data.portfolioUrl} style={styles.link}>Portfolio</Link>
              </>
            ) : null}
            {' | '}
            <Link src={data.linkedinUrl} style={styles.link}>LinkedIn</Link>
            {' | '}
            <Link src={data.githubUrl} style={styles.link}>GitHub</Link>
            {' | '}
            <Link src={data.googleScholarUrl} style={styles.link}>Scholar</Link>
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        <Text style={styles.summary}>{data.summary}</Text>

        {/* Education */}
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.sectionDivider} />
        {data.education.map((edu, idx) => (
          <View key={idx} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryTitle}>{edu.institution}</Text>
                <Text style={styles.entrySubtitle}>
                  {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryDetail}>{edu.location}</Text>
                <Text style={styles.entryDetail}>{edu.period}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>Experience</Text>
        <View style={styles.sectionDivider} />
        {data.experience.map((exp, idx) => (
          <View key={idx} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryTitle}>{exp.company}</Text>
                <Text style={styles.entrySubtitle}>{exp.role}</Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryDetail}>{exp.location}</Text>
                <Text style={styles.entryDetail}>{exp.period}</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {exp.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
            {exp.links && exp.links.length > 0 && (
              <Text style={styles.linksRow}>
                {exp.links.map((l, lIdx) => (
                  <Text key={lIdx}>
                    {lIdx > 0 ? ' · ' : ''}
                    <Link src={l.href} style={styles.link}>
                      {l.label}
                    </Link>
                  </Text>
                ))}
              </Text>
            )}
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitle}>Research & Projects</Text>
        <View style={styles.sectionDivider} />
        {data.projects.map((proj, idx) => (
          <View key={idx} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryTitle}>{proj.title}</Text>
              </View>
              <View style={styles.entryRight}>
                <Text style={styles.entryDetail}>{proj.period}</Text>
              </View>
            </View>
            <View style={styles.bulletList}>
              {proj.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
            {proj.publication && proj.publicationLink && (
              <Text style={styles.pubRow}>
                <Link src={proj.publicationLink} style={styles.link}>{proj.publication}</Link>
                {proj.publicationVenue ? `, ${proj.publicationVenue}` : ''}
              </Text>
            )}
          </View>
        ))}

        {/* Skills */}
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.skillsContainer}>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Programming: </Text>
            <Text style={styles.skillText}>{data.skills.programming.join(', ')}</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Machine Learning: </Text>
            <Text style={styles.skillText}>{data.skills.ml.join(', ')}</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>HPC & Cloud: </Text>
            <Text style={styles.skillText}>{data.skills.hpc.join(', ')}</Text>
          </View>
          <View style={styles.skillRow}>
            <Text style={styles.skillLabel}>Simulation & CAE: </Text>
            <Text style={styles.skillText}>{data.skills.simulation.join(', ')}</Text>
          </View>
          {data.skills.physicsAiStack && data.skills.physicsAiStack.length > 0 && (
            <View style={styles.skillRow}>
              <Text style={styles.skillLabel}>Physics AI Stack: </Text>
              <Text style={styles.skillText}>{data.skills.physicsAiStack.join(', ')}</Text>
            </View>
          )}
        </View>

        {/* Talks, Teaching & Mentorship (combined) */}
        {((data.talksAndPress && data.talksAndPress.length > 0) ||
          (data.leadership && data.leadership.length > 0)) && (
          <>
            <Text style={styles.sectionTitle}>Talks, Teaching & Mentorship</Text>
            <View style={styles.sectionDivider} />
            <View style={styles.bulletList}>
              {data.talksAndPress?.map((item, idx) => (
                <View key={`t-${idx}`} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    {item.href ? (
                      <Link src={item.href} style={styles.link}>{item.text}</Link>
                    ) : (
                      item.text
                    )}
                  </Text>
                </View>
              ))}
              {data.leadership?.map((item, idx) => (
                <View key={`l-${idx}`} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

// Export a function that generates the PDF buffer
export async function generateResumePDF(data: ResumeData): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return renderToBuffer(<ResumeDocument data={data} />);
}
