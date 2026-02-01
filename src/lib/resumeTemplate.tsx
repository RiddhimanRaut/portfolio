import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';

// Using built-in Times-Roman font (no external font loading needed)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingTop: 30,
    paddingBottom: 30,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.3,
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 10,
    color: '#333',
    marginBottom: 8,
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
  },
  summary: {
    fontSize: 10,
    textAlign: 'justify',
    marginBottom: 12,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
    marginBottom: 8,
    marginTop: 10,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  entryTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  entrySubtitle: {
    fontStyle: 'italic',
    fontSize: 10,
  },
  entryDate: {
    fontSize: 10,
    textAlign: 'right',
  },
  entryLocation: {
    fontSize: 10,
    textAlign: 'right',
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 4,
    marginBottom: 6,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  toolsSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  toolsLabel: {
    fontWeight: 'bold',
    fontSize: 9,
  },
  toolsText: {
    fontSize: 9,
  },
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillCategory: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  skillItems: {
    fontSize: 10,
  },
});

export interface ResumeData {
  name: string;
  email: string;
  workEmail: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
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
  }>;
  projects: Array<{
    title: string;
    period: string;
    bullets: string[];
    publication?: string;
    publicationLink?: string;
  }>;
  skills: {
    programming: string[];
    ml: string[];
    hpc: string[];
    simulation: string[];
  };
  leadership?: string[];
}

function ResumeDocument({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.contactLine}>
            {data.email} | {data.location} |{' '}
            <Link src={data.linkedinUrl} style={styles.link}>LinkedIn</Link> |{' '}
            <Link src={data.githubUrl} style={styles.link}>GitHub</Link>
          </Text>
        </View>

        {/* Summary */}
        <Text style={styles.summary}>{data.summary}</Text>

        {/* Education */}
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        {data.education.map((edu, idx) => (
          <View key={idx}>
            <View style={styles.entryRow}>
              <Text style={styles.entryTitle}>{edu.institution}</Text>
              <Text style={styles.entryDate}>{edu.period}</Text>
            </View>
            <View style={styles.entryRow}>
              <Text style={styles.entrySubtitle}>
                {edu.degree}{edu.field ? `, ${edu.field}` : ''}
              </Text>
              {edu.gpa && <Text style={styles.entryLocation}>GPA: {edu.gpa}</Text>}
            </View>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
        {data.experience.map((exp, idx) => (
          <View key={idx} style={{ marginBottom: 8 }}>
            <View style={styles.entryRow}>
              <Text style={styles.entryTitle}>{exp.company}</Text>
              <Text style={styles.entryLocation}>{exp.location}</Text>
            </View>
            <View style={styles.entryRow}>
              <Text style={styles.entrySubtitle}>{exp.role}</Text>
              <Text style={styles.entryDate}>{exp.period}</Text>
            </View>
            <View style={styles.bulletList}>
              {exp.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
            {exp.tools && (
              <View style={styles.toolsSection}>
                <Text style={styles.toolsText}>
                  <Text style={styles.toolsLabel}>Tools used: </Text>
                  {exp.tools}
                </Text>
              </View>
            )}
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitle}>PROJECTS</Text>
        {data.projects.map((proj, idx) => (
          <View key={idx} style={{ marginBottom: 6 }}>
            <View style={styles.entryRow}>
              <Text style={styles.entryTitle}>{proj.title}</Text>
              <Text style={styles.entryDate}>{proj.period}</Text>
            </View>
            <View style={styles.bulletList}>
              {proj.bullets.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
              {proj.publication && (
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Publication: {proj.publicationLink ? (
                      <Link src={proj.publicationLink} style={styles.link}>
                        {proj.publication}
                      </Link>
                    ) : proj.publication}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Skills & Leadership */}
        <Text style={styles.sectionTitle}>SKILLS & LEADERSHIP</Text>

        {data.leadership && data.leadership.length > 0 && (
          <View style={{ marginBottom: 6 }}>
            <Text style={styles.skillCategory}>Leadership:</Text>
            <View style={styles.bulletList}>
              {data.leadership.map((item, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Programming: </Text>
          <Text style={styles.skillItems}>{data.skills.programming.join(', ')}</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Machine Learning: </Text>
          <Text style={styles.skillItems}>{data.skills.ml.join(', ')}</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>HPC & Cloud: </Text>
          <Text style={styles.skillItems}>{data.skills.hpc.join(', ')}</Text>
        </View>
        <View style={styles.skillsRow}>
          <Text style={styles.skillCategory}>Simulation & CAE: </Text>
          <Text style={styles.skillItems}>{data.skills.simulation.join(', ')}</Text>
        </View>
      </Page>
    </Document>
  );
}

// Export a function that generates the PDF buffer
export async function generateResumePDF(data: ResumeData): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return renderToBuffer(<ResumeDocument data={data} />);
}
