import BasePage from './BasePage';
import { Page } from 'playwright';

export interface TableRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export default class WebTablesPage extends BasePage {
  private addButton = '#addNewRecordButton';
  private searchBox = '#searchBox';
  private registrationForm = '.modal-content';
  private firstNameInput = '#firstName';
  private lastNameInput = '#lastName';
  private emailInput = '#userEmail';
  private ageInput = '#age';
  private salaryInput = '#salary';
  private departmentInput = '#department';
  private submitButton = '#submit';
  private tableRows = '.rt-tr-group';
  private deleteButton = 'span[title="Delete"]';
  private editButton = 'span[title="Edit"]';
  
  constructor(page: Page) {
    super(page);
  }

  async navigateToWebTables(): Promise<void> {
    try {
      await this.navigate('/webtables');
      await this.page.waitForSelector(this.addButton, { timeout: 10000 });
    } catch (error) {
      console.warn('Warning when navigating to web tables:', error);
      await this.page.reload();
      await this.page.waitForTimeout(1000);
    }
  }

  async clickAddButton(): Promise<void> {
    await this.page.click(this.addButton);
    await this.waitForElement(this.registrationForm);
  }

  async fillRegistrationForm(record: TableRecord): Promise<void> {
    await this.page.fill(this.firstNameInput, record.firstName);
    await this.page.fill(this.lastNameInput, record.lastName);
    await this.page.fill(this.emailInput, record.email);
    await this.page.fill(this.ageInput, record.age);
    await this.page.fill(this.salaryInput, record.salary);
    await this.page.fill(this.departmentInput, record.department);
  }

  async submitForm(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async searchRecord(searchText: string): Promise<void> {
    await this.page.fill(this.searchBox, searchText);
  }

  async recordExists(firstName: string, lastName: string): Promise<boolean> {
    const rows = await this.page.$$(`${this.tableRows} .rt-td`);
    for (let i = 0; i < rows.length; i += 7) {
      const firstNameCell = await rows[i].textContent();
      if (firstNameCell === firstName) {
        const lastNameCell = await rows[i + 1].textContent();
        if (lastNameCell === lastName) {
          return true;
        }
      }
    }
    return false;
  }

  async deleteRecord(firstName: string, lastName: string): Promise<void> {
    await this.searchRecord(firstName);
    
    const rows = await this.page.$$(`${this.tableRows} .rt-td`);
    for (let i = 0; i < rows.length; i += 7) {
      const firstNameCell = await rows[i].textContent();
      if (firstNameCell === firstName) {
        const lastNameCell = await rows[i + 1].textContent();
        if (lastNameCell === lastName) {
          const deleteButton = await rows[i + 6].$(this.deleteButton);
          if (deleteButton) {
            await deleteButton.click();
          }
          break;
        }
      }
    }
  }

  async editRecord(firstName: string, lastName: string, newData: TableRecord): Promise<void> {
    await this.searchRecord(firstName);
    
    const rows = await this.page.$$(`${this.tableRows} .rt-td`);
    for (let i = 0; i < rows.length; i += 7) {
      const firstNameCell = await rows[i].textContent();
      if (firstNameCell === firstName) {
        const lastNameCell = await rows[i + 1].textContent();
        if (lastNameCell === lastName) {
          const editButton = await rows[i + 6].$(this.editButton);
          if (editButton) {
            await editButton.click();
          }
          
          await this.fillRegistrationForm(newData);
          await this.submitForm();
          break;
        }
      }
    }
  }

  async getRecordCount(): Promise<number> {
    const rows = await this.page.$$(`${this.tableRows}:not(:empty) .rt-td:first-child`);
    return rows.length;
  }
}